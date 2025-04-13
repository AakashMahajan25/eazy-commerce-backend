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
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("@/config/redis");
const http_1 = require("@/config/http");
const env_1 = require("@/config/env");
// Uses Sliding Window
const rateLimiter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userIp = req.ip;
    const redisKey = `rate_limit:${userIp}`;
    const now = Date.now();
    const windowSize = parseInt(env_1.RATE_LIMITER_WINDOW_SIZE);
    const maxRequests = parseInt(env_1.RATE_LIMITER_MAX_REQUESTS);
    try {
        yield redis_1.redisClient.zremrangebyscore(redisKey, 0, now - windowSize * 1000);
        const requestCount = yield redis_1.redisClient.zcard(redisKey);
        if (requestCount >= maxRequests) {
            return res.status(http_1.TOO_MANY_REQUESTS).json({ error: "Too many requests, try again later!" });
        }
        yield redis_1.redisClient.zadd(redisKey, now.toString(), now.toString());
        yield redis_1.redisClient.expire(redisKey, windowSize);
        next();
    }
    catch (error) {
        console.error("Redis Error:", error);
        res.status(http_1.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
    }
});
exports.default = rateLimiter;
