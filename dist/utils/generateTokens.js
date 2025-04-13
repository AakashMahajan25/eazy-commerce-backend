"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("@/config/jwt");
const generateAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, jwt_1.JWT_CONFIG.accessTokenSecret, {
        expiresIn: jwt_1.JWT_CONFIG.accessTokenExpiryString
        // expiresIn: '15m' 
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, jwt_1.JWT_CONFIG.refreshTokenSecret, {
        expiresIn: jwt_1.JWT_CONFIG.refreshTokenExpiryString
        // expiresIn: '7d'
    });
};
exports.generateRefreshToken = generateRefreshToken;
