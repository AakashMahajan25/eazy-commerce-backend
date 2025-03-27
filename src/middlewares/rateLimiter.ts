import { Request, Response, NextFunction } from 'express';
import { redisClient } from '@/config/redis';
import { TOO_MANY_REQUESTS, INTERNAL_SERVER_ERROR } from '@/config/http'

// Uses Sliding Window

const WINDOW_SIZE = 60;
const MAX_REQUESTS = 10;

const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
    const userIp = req.ip;
    const redisKey = `rate_limit:${userIp}`;
    const now = Date.now();

    try {
        
        await redisClient.zremrangebyscore(redisKey, 0, now - WINDOW_SIZE * 1000);
        
        const requestCount = await redisClient.zcard(redisKey);

        if (requestCount >= MAX_REQUESTS) {
            return res.status(TOO_MANY_REQUESTS).json({ error: "Too many requests, try again later!"});
        } 

        await redisClient.zadd(redisKey, now.toString());

        await redisClient.expire(redisKey, WINDOW_SIZE);

        next();

    } catch (error) {
        console.error("Redis Error:", error);
        res.status(INTERNAL_SERVER_ERROR).json({error: "Internal Server Error"});
    }

};

export default rateLimiter;