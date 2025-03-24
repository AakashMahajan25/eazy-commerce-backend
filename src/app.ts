import express from 'express';
import morgan from 'morgan'
import cors from 'cors';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health-check', (req, res) => {
    res.send('Backend is up...');
})

export default app;
