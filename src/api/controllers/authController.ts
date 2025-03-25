import { Request, Response } from 'express';
import * as authService from '@/services/authService';
import { UNAUTHORIZED, OK } from '@/config/http'
import { generateAccessToken } from '@/utils/generateTokens';

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
};

export const refresh = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(UNAUTHORIZED).json({ message: 'Missing refresh token'});
    const decoded = await authService.verifyRefreshToken(refreshToken);
    const newAccessToken = generateAccessToken({ userId: decoded.userId });

    res.json({ accessToken: newAccessToken});
};

export const logout = async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    await authService.logoutUser(userId);
    res.clearCookie('refreshToken');
    res.status(OK).json({ message: 'Logged Out'});
};