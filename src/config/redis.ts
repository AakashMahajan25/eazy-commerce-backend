import { Redis } from 'ioredis'
import { REDIS_URL } from '@/config/env'

export const redisClient = new Redis(REDIS_URL);

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();