import { generateAccessToken, generateRefreshToken } from "@/utils/generateTokens";
import { redisClient } from "@/config/redis"; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { JWT_CONFIG } from "@/config/jwt";
import { userModel } from "@/models/userModel";

export const registerUser = async (name: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return userModel.create({
        data: {name, email, password: hashedPassword},
    });
};

export const loginUser = async (email: string, password: string) => {
    const user = await userModel.findUnique({ where: { email }});
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid email or password');
    }
    const payload = { userId: user.id, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await redisClient.setex("refresh_token:" + user.id.toString(), JWT_CONFIG.refreshTokenExpiryNumerical! ,refreshToken);

    return { accessToken, refreshToken };
}

export const verifyRefreshToken = async (token: string) => {
    const decoded = jwt.verify(token, JWT_CONFIG.refreshTokenSecret) as { userId: string };
    const storedToken = await redisClient.get("refresh_token:" + decoded.userId);
    if (storedToken !== token) throw new Error('Invalid refresh token');
    return decoded;
};

export const logoutUser = async (userId: string) => {
    await redisClient.del("refresh_token:" + userId);
};
