import { Request, Response } from "express";

class AuthController {

    async oauthCallback(req: Request, res: Response) {
        try {
            // req.user will write the Passport after a successful Google/GitHub login
            if (!req.user) {
                return res.redirect('/auth/login?error=oauth_failed');
            }

            // Call your service! Pass the profile data there.
            const tokens = await req.app.locals.services.auth.handleOAuthUser(req.user);

            if (!tokens) {
                return res.redirect('/auth/login?error=invalid_credentials');
            }

            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                secure: false, // set this to true in production
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.cookie('accessToken', tokens.accessToken, {
                httpOnly: true,
                secure: false,  // set this to true in production
                sameSite: "lax",
                maxAge: 15 * 60 * 1000 
            });

            res.redirect('/');
            
        } catch (error: unknown) {
            console.error("OAuth Callback Error:", error);
            res.redirect('/auth/login?error=server_error');
        }
    }

    async getToken(req : Request, res : Response) {
        try {
            const tokens = await req.app.locals.services.auth.getToken(req.body);

            if (!tokens) {
                return res.status(400).json({ msg : "invalid credentials." });
            }

            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly : true,
                secure : false,
                sameSite: "lax",
                maxAge : 7 * 24 * 60 * 60 * 1000
            });

            res.cookie('accessToken', tokens.accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 15 * 60 * 1000 
            });
            
            res.status(200).json({ accessToken : tokens.accessToken });
        } catch (error : unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            res.status(400).json({ error : error })
        }
    }

    async getNewAccessToken(req : Request, res : Response) {
        try {
            const newToken = await req.app.locals.services.auth.getNewAccessToken(res.locals.Uid);

            return res.status(200).json({ newToken });
        } catch (error : unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            res.status(400).json({ error : error })
        }
    }

    async getUser(req : Request, res : Response) {
        try {
            const user = await req.app.locals.services.auth.getUser(res.locals.Uid);

            return res.status(200).json(user);
        } catch (error : unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            res.status(400).json({ error : error })
        }
    }

    async clearCookie(req : Request, res : Response) {
        try {
            await req.app.locals.services.auth.clearCookie(req.cookies.refreshToken);

            res.clearCookie("refreshToken");
            res.clearCookie("accessToken");

            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');

            return res.redirect('/');
        } catch (error : unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            res.status(400).json({ error : error })
        }
    }
}

export default AuthController;
