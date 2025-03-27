import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY_STRING, ACCESS_TOKEN_EXPIRY_NUMERICAL ,REFRESH_TOKEN_EXPIRY_STRING, REFRESH_TOKEN_EXPIRY_NUMERICAL } from '@/config/env'
import { Secret, SignOptions } from 'jsonwebtoken'

export const JWT_CONFIG = {
    accessTokenSecret: ACCESS_TOKEN_SECRET as Secret,
    refreshTokenSecret: REFRESH_TOKEN_SECRET as Secret,
    accessTokenExpiryString: ACCESS_TOKEN_EXPIRY_STRING as SignOptions['expiresIn'],
    accessTokenExpiryNumerical: ACCESS_TOKEN_EXPIRY_NUMERICAL as SignOptions['expiresIn'],
    refreshTokenExpiryString: REFRESH_TOKEN_EXPIRY_STRING as SignOptions['expiresIn'],
    refreshTokenExpiryNumerical: REFRESH_TOKEN_EXPIRY_NUMERICAL as SignOptions['expiresIn']
}