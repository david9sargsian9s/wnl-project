import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface JwtData extends JwtPayload {
    id : string;
}

function getAccessFromCheck(req : Request, res : Response, next : NextFunction) {
    // if (!req.cookies) {
    //     return res.redirect('/reg');
    // }
    
    // if we are rendering something.  ^

    const token = req.cookies.token;

    const secret =  process.env.JWT_ACCESS_SECRET;
    if (!secret) {
        throw new Error("Critical error: JWT_ACCESS_SECRET is not defined.");
    }

    try {
        const decoded = jwt.verify(token, secret) as { id: string; role: 'user' | 'admin' | 'moderator' };

        req.user = decoded;

        return next();
    } catch (error : unknown) {
        // return res.redirect('/login');
        
        // if we have a login endpoint. ^

        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(400).json({ error : error })
    }
}

export default getAccessFromCheck;