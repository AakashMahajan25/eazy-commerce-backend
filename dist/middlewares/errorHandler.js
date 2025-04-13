"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = __importDefault(require("@/utils/logger"));
const env_1 = require("@/config/env");
const http_1 = require("@/config/http");
const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || http_1.INTERNAL_SERVER_ERROR;
    const response = {
        message: err.message || 'Internal Server Error',
    };
    if (env_1.NODE_ENV === 'development') {
        response.stack = err.stack;
    }
    logger_1.default.error({
        method: req.method,
        url: req.url,
        status: statusCode,
        message: err.message,
        stack: env_1.NODE_ENV === 'development' ? err.stack : undefined,
    });
    res.status(statusCode).json(response);
};
exports.errorHandler = errorHandler;
