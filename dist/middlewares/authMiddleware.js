"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("@/config/jwt");
const http_1 = require("@/config/http");
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res.status(http_1.UNAUTHORIZED).json({ message: 'Unauthorized' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwt_1.JWT_CONFIG.accessTokenSecret);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log("Token is ", token);
        console.log("secret");
        console.log("Error is ", error);
        return res.status(http_1.FORBIDDEN).json({ message: 'Forbidden' });
    }
};
exports.authMiddleware = authMiddleware;
