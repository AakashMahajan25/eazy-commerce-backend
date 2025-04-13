"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_CONFIG = void 0;
const env_1 = require("@/config/env");
exports.JWT_CONFIG = {
    accessTokenSecret: env_1.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: env_1.REFRESH_TOKEN_SECRET,
    accessTokenExpiryString: env_1.ACCESS_TOKEN_EXPIRY_STRING,
    accessTokenExpiryNumerical: env_1.ACCESS_TOKEN_EXPIRY_NUMERICAL,
    refreshTokenExpiryString: env_1.REFRESH_TOKEN_EXPIRY_STRING,
    refreshTokenExpiryNumerical: env_1.REFRESH_TOKEN_EXPIRY_NUMERICAL
};
