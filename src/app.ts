import { redisClient } from './config/redis';
import * as os from 'os';
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

app.get('/api/health', (req, res) => {
    // Get CPU info
    const cpuInfo = os.cpus();
    const cpuModel = cpuInfo.length > 0 ? cpuInfo[0].model : 'Unknown';
    
    // Calculate CPU usage (this is simplified - for more accurate values consider using a library)
    const cpuUsage = Math.round(Math.random() * 100); // This is just a placeholder
    
    // Get memory info
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    
    // Get disk info (this is simplified - for more accurate values consider using a library)
    const diskInfo = {
      total: 1000000000000, // 1TB (placeholder)
      free: 400000000000,   // 400GB (placeholder)
      used: 600000000000    // 600GB (placeholder)
    };
    
    // Sample services status
    const services = [
      { name: 'API Server', status: 'healthy' },
      { name: 'Database', status: 'healthy' },
      { name: 'Cache', status: 'healthy' }
    ];
    
    res.json({
      status: 'healthy',
      hostname: os.hostname(),
      uptime: os.uptime(),
      platform: `${os.type()} ${os.release()}`,
      loadAverage: os.loadavg(),
      memory: {
        total: totalMemory,
        free: freeMemory,
        used: usedMemory
      },
      cpu: {
        model: cpuModel,
        cores: os.cpus().length,
        usage: cpuUsage
      },
      disk: diskInfo,
      services: services,
      version: '1.0.0'
    });
  });
  
  // Serve health dashboard
  app.get('/health-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/health-dashboard.html'));
  });

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
