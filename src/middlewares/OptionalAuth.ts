import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IJwtPayload } from '../types/express';

export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken || req.cookies?.token;
    
    if (!token) {
        return next();
    }

    try {
        const secret = process.env.JWT_ACCESS_SECRET;
        if (secret) {
            const decoded = jwt.verify(token, secret) as IJwtPayload;
            req.jwtUser = decoded; 
        }
    } catch (err) {
        console.log("The guest has an invalid token, we are ignoring it.");
    }
    
    next();
};