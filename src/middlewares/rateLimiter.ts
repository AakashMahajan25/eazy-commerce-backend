import { Request, Response, NextFunction } from 'express';
import { redisClient } from '@/config/redis';


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
            return res.status(429).json({ error: "Too many requests, try again later!"});
        } 

        await redisClient.zadd(redisKey, now.toString());

        await redisClient.expire(redisKey, WINDOW_SIZE);

        next();

    } catch (error) {
        console.error("Redis Error:", error);
        res.status(500).json({error: "Internal Server Error"});
    }

};

export default rateLimiter;