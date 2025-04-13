"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RATE_LIMITER_MAX_REQUESTS = exports.RATE_LIMITER_WINDOW_SIZE = exports.REDIS_URL = exports.REFRESH_TOKEN_EXPIRY_STRING = exports.REFRESH_TOKEN_EXPIRY_NUMERICAL = exports.ACCESS_TOKEN_EXPIRY_STRING = exports.ACCESS_TOKEN_EXPIRY_NUMERICAL = exports.REFRESH_TOKEN_SECRET = exports.ACCESS_TOKEN_SECRET = exports.NODE_ENV = exports.PORT = exports.DATABASE_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getEnvVar = (key) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Environment Variable ${key} is not defined`);
    }
    return value;
};
exports.DATABASE_URL = getEnvVar("DATABASE_URL");
exports.PORT = getEnvVar("PORT");
exports.NODE_ENV = getEnvVar("NODE_ENV");
exports.ACCESS_TOKEN_SECRET = getEnvVar("ACCESS_TOKEN_SECRET");
exports.REFRESH_TOKEN_SECRET = getEnvVar("REFRESH_TOKEN_SECRET");
exports.ACCESS_TOKEN_EXPIRY_NUMERICAL = getEnvVar("ACCESS_TOKEN_EXPIRY_NUMERICAL");
exports.ACCESS_TOKEN_EXPIRY_STRING = getEnvVar("ACCESS_TOKEN_EXPIRY_STRING");
exports.REFRESH_TOKEN_EXPIRY_NUMERICAL = getEnvVar("REFRESH_TOKEN_EXPIRY_NUMERICAL");
exports.REFRESH_TOKEN_EXPIRY_STRING = getEnvVar("REFRESH_TOKEN_EXPIRY_STRING");
exports.REDIS_URL = getEnvVar("REDIS_URL");
exports.RATE_LIMITER_WINDOW_SIZE = getEnvVar("RATE_LIMITER_WINDOW_SIZE");
exports.RATE_LIMITER_MAX_REQUESTS = getEnvVar("RATE_LIMITER_MAX_REQUESTS");
