import { ILogin, ITokens } from "../types/auth";
import { IModels } from "../types/models";
import { IUserDocument } from "../model/userModel";

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthService {
    private model: IModels;

    constructor(model: IModels) {
        this.model = model;
    }

    async handleOAuthUser(oauthProfile: any): Promise<ITokens | null> {
        try {
            const email = oauthProfile.emails && oauthProfile.emails[0]?.value
                ? oauthProfile.emails[0].value
                : null;

            if (!email) {
                throw new Error("Email not provided by OAuth provider.");
            }

            let user = await this.model.users.findOne({ email });

            if (!user) {
                const randomPassword = "Wnl_Project_Secure_OAuth_2026_$" + Math.random().toString(36).substring(2, 10);

                user = await this.model.users.create({
                    email: email,
                    username: oauthProfile.displayName || oauthProfile.username || 'WNL_User',
                    name: oauthProfile.displayName || 'WNL_User',
                    age: 18,
                    avatarUrl: oauthProfile.photos && oauthProfile.photos[0]?.value ? oauthProfile.photos[0].value : '',
                    password: randomPassword,
                    isOAuth: true,
                    provider: oauthProfile.provider
                } as any);

                await user.save({ validateBeforeSave: false });
            }

            const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;
            
            if (!JWT_ACCESS_SECRET || !JWT_REFRESH_SECRET) {
                throw new Error("Critical error: JWT secrets are not defined in the .env file.");
            }

            const accessToken = jwt.sign(
                { id : user._id, name: user.name, email: user.email }, 
                JWT_ACCESS_SECRET, 
                { expiresIn : '9m' }
            );
            const refreshToken = jwt.sign({ id : user._id }, JWT_REFRESH_SECRET, { expiresIn : '40d' });

            await this.model.token.updateOne(
                { userID: String(user._id) as any },
                {
                    $set: {
                        refresh: refreshToken
                    }
                },
                { upsert: true }
            );

            return {
                accessToken,
                refreshToken
            };

        } catch (error) {
            console.error("Error in handleOAuthUser service:", error);
            return null;
        }
    }

    async getToken(body : ILogin): Promise<ITokens | null> {
        const { email, password } = body;

        const user = await this.model.users.findOne({ email });

        if(!user || !user.password) return null;

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) return null;

        const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;
        
        if (!JWT_ACCESS_SECRET || !JWT_REFRESH_SECRET) {
            throw new Error("Critical error: JWT secrets are not defined in the .env file.");
        }

        const accessToken = jwt.sign(
            { id : user._id, name: user.name, email: user.email }, 
            JWT_ACCESS_SECRET, 
            { expiresIn : '9m' }
        );

        const refreshToken = jwt.sign({ id : user._id }, JWT_REFRESH_SECRET, { expiresIn : '40d' });

        await this.model.token.updateOne(
            { userID: String(user._id) as any },
            {
                $set: {
                    refresh: refreshToken
                }
            },
            { upsert: true }
        );

        return {
            accessToken,
            refreshToken
        };
    }

    async getNewAccessToken(Uid : string): Promise<string> {
        const secret = process.env.JWT_ACCESS_SECRET;
        if (!secret) {
            throw new Error("Critical error: JWT_ACCESS_SECRET is not defined.");
        }

        const user = await this.model.users.findById(Uid);
        const name = user ? user.name : 'WNL_User';
        const email = user ? user.email : '';

        const access = jwt.sign({ id : Uid, name, email }, secret, { expiresIn : '9m' });
        return access;
    }

    async getUser(id : string): Promise<IUserDocument | null> {
        return await this.model.users.findById(id);
    }

    async clearCookie(refreshToken : string) {
        const removeCookies = await this.model.token.deleteOne({ refresh : refreshToken });
        return removeCookies;
    }
}

export default AuthService;