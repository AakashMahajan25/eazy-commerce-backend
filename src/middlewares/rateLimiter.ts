import { Request, Response, NextFunction } from 'express';
import { redisClient } from '@/config/redis';
import { TOO_MANY_REQUESTS, INTERNAL_SERVER_ERROR } from '@/config/http';
import { RATE_LIMITER_MAX_REQUESTS, RATE_LIMITER_WINDOW_SIZE } from '@/config/env';

// Uses Sliding Window

const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
    const userIp = req.ip;
    const redisKey = `rate_limit:${userIp}`;
    const now = Date.now();
    const windowSize = parseInt(RATE_LIMITER_WINDOW_SIZE);
    const maxRequests = parseInt(RATE_LIMITER_MAX_REQUESTS);

    try {
        await redisClient.zremrangebyscore(redisKey, 0, now - windowSize * 1000);
        
        const requestCount = await redisClient.zcard(redisKey);

        if (requestCount >= maxRequests) {
            return res.status(TOO_MANY_REQUESTS).json({ error: "Too many requests, try again later!"});
        } 

        await redisClient.zadd(redisKey, now.toString(), now.toString());

        await redisClient.expire(redisKey, windowSize);

        next();

    } catch (error) {
        console.error("Redis Error:", error);
        res.status(INTERNAL_SERVER_ERROR).json({error: "Internal Server Error"});
    }

};

export default rateLimiter;