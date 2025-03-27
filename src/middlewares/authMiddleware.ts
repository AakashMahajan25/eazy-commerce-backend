import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from "@/config/jwt";
import { UNAUTHORIZED, FORBIDDEN} from '@/config/http'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(UNAUTHORIZED).json({message: 'Unauthorized'});

    try {
        const decoded = jwt.verify(token, JWT_CONFIG.accessTokenSecret);
        (req as any).user = decoded;
        next();
    } catch (error) {
        console.log("Token is ", token);
        console.log("secret", )
        console.log("Error is ", error);
        return res.status(FORBIDDEN).json({ message: 'Forbidden'});
    }
};