"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const ioredis_1 = require("ioredis");
const env_1 = require("@/config/env");
exports.redisClient = new ioredis_1.Redis(env_1.REDIS_URL);
exports.redisClient.on('error', (err) => console.log('Redis Client Error', err));
