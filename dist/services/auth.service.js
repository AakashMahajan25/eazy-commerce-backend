"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.verifyRefreshToken = exports.loginUser = exports.registerUser = void 0;
const generateTokens_1 = require("@/utils/generateTokens");
const redis_1 = require("@/config/redis");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("@/config/jwt");
const user_model_1 = require("@/models/user.model");
const registerUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    return user_model_1.userModel.create({
        data: { name, email, password: hashedPassword },
    });
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.findUnique({ where: { email } });
    if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
        throw new Error('Invalid email or password');
    }
    const payload = { userId: user.id, email: user.email };
    const accessToken = (0, generateTokens_1.generateAccessToken)(payload);
    const refreshToken = (0, generateTokens_1.generateRefreshToken)(payload);
    yield redis_1.redisClient.setex("refresh_token:" + user.id.toString(), jwt_1.JWT_CONFIG.refreshTokenExpiryNumerical, refreshToken);
    return { accessToken, refreshToken };
});
exports.loginUser = loginUser;
const verifyRefreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, jwt_1.JWT_CONFIG.refreshTokenSecret);
    const storedToken = yield redis_1.redisClient.get("refresh_token:" + decoded.userId);
    if (storedToken !== token)
        throw new Error('Invalid refresh token');
    return decoded;
});
exports.verifyRefreshToken = verifyRefreshToken;
const logoutUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield redis_1.redisClient.del("refresh_token:" + userId);
});
exports.logoutUser = logoutUser;
