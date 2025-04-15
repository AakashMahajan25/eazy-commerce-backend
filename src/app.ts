import { redisClient } from './config/redis';
//npm packages
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import logger from '@/utils/logger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import path from 'path';
//routes
import router from '@/api/routes';
//middlewares
import rateLimiter from '@/middlewares/rateLimiter'
// import { errorHandler } from './middlewares/errorHandler';
// import { errorHandler } from '@/middlewares/errorHandler';
import { NODE_ENV } from '@/config/env';

const app = express();

const isProduction = NODE_ENV === 'production';

app.use(cors({
  origin: '*', // For development, or specify your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim()),
    },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet(
  {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'", isProduction ? "https://your-production-domain.com" : "http://localhost:3000"]
      },
    }
  }
));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

app.use(rateLimiter);
// app.use(errorHandler);

app.use('/api', router);

app.get('health-check', async(req, res) => {
  res.json({
    status: 'ok'
  })
})

//Redis Cron Job API
app.get('/redis-cron-job', async (req, res) => {
    try {
        const value = await redisClient.get("key");
        res.json({
            status: 'success',
            data: value
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch data from Redis'
        });
    }
})

export default app;
