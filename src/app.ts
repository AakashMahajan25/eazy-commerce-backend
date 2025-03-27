//npm packages
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import logger from '@/utils/logger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
//routes
import router from '@/api/routes';
//middlewares
import rateLimiter from '@/middlewares/rateLimiter'
// import { rateLimiter } from '@/middlewares/rateLimiter';
// import { errorHandler } from '@/middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim()),
    },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

app.use(rateLimiter);

app.use('/api', router);


//Health Check API
app.get('/health-check', (req, res) => {
    res.json({
        status: 'ok'
    });
});

export default app;
