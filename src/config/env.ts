import dotenv from "dotenv";
dotenv.config();

const getEnvVar = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Environment Variable ${key} is not defined`);
    }
    return value
}

export const DATABASE_URL = getEnvVar("DATABASE_URL");
export const PORT = getEnvVar("PORT");
export const NODE_ENV = getEnvVar("NODE_ENV");
export const ACCESS_TOKEN_SECRET = getEnvVar("ACCESS_TOKEN_SECRET");
export const REFRESH_TOKEN_SECRET = getEnvVar("REFRESH_TOKEN_SECRET");
export const ACCESS_TOKEN_EXPIRY = getEnvVar("ACCESS_TOKEN_EXPIRY");
export const REFRESH_TOKEN_EXPIRY = getEnvVar("REFRESH_TOKEN_EXPIRY");
export const REDIS_URL = getEnvVar("REDIS_URL");