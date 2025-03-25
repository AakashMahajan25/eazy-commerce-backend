import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from '@/config/env'
import { Secret, SignOptions } from 'jsonwebtoken'

export const JWT_CONFIG = {
    accessTokenSecret: ACCESS_TOKEN_SECRET as Secret,
    refreshTokenSecret: REFRESH_TOKEN_SECRET as Secret,
    accessTokenExpiry: ACCESS_TOKEN_EXPIRY as SignOptions['expiresIn'],
    refreshTokenExpiry: REFRESH_TOKEN_EXPIRY as SignOptions['expiresIn']
}