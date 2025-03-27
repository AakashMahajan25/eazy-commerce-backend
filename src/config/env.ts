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
export const ACCESS_TOKEN_EXPIRY_NUMERICAL = getEnvVar("ACCESS_TOKEN_EXPIRY_NUMERICAL");
export const ACCESS_TOKEN_EXPIRY_STRING = getEnvVar("ACCESS_TOKEN_EXPIRY_STRING");
export const REFRESH_TOKEN_EXPIRY_NUMERICAL = getEnvVar("REFRESH_TOKEN_EXPIRY_NUMERICAL");
export const REFRESH_TOKEN_EXPIRY_STRING = getEnvVar("REFRESH_TOKEN_EXPIRY_STRING");
export const REDIS_URL = getEnvVar("REDIS_URL");