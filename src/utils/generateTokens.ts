import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "@/config/jwt";


export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, JWT_CONFIG.accessTokenSecret, {
    expiresIn: JWT_CONFIG.accessTokenExpiry
  });
};

export const generateRefreshToken = (payload: object) => {
    return jwt.sign(payload, JWT_CONFIG.refreshTokenSecret, {
        expiresIn: JWT_CONFIG.refreshTokenExpiry
    })
}
