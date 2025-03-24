import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
import logger from '@/utils/logger'

const app = express();

app.use(cors());
app.use(morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim()),
    },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health-check', (req, res) => {
    res.json({
        status: 'ok'
    });
})

export default app;
