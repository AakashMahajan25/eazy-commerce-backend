import { Request, Response } from 'express';
import * as authService from '@/services/authService';

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const user = await authService.registerUser(name, email, password);
    res.json({ user });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await authService.loginUser(email, password);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
}