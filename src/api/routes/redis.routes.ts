import { Router } from 'express';
import { redisClient } from '@/config/redis';

const router = Router();

router.get('/key/:keyName', async (req, res) => {
    try {
        const { keyName } = req.params;
        const value = await redisClient.get(keyName);
        
        if (value === null) {
            return res.status(404).json({
                success: false,
                message: 'Key not found'
            });
        }

        res.json({
            success: true,
            data: {
                key: keyName,
                value: value
            }
        });
    } catch (error) {
        console.error('Redis error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching Redis key'
        });
    }
});

export default router; 