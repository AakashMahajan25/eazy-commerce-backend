"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//npm packages
const express_1 = __importDefault(require("express"));
// import cors from 'cors';
// import morgan from 'morgan';
// import logger from '@/utils/logger';
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import helmet from 'helmet';
//routes
const routes_1 = __importDefault(require("@/api/routes"));
//middlewares
// import rateLimiter from '@/middlewares/rateLimiter'
// import { errorHandler } from './middlewares/errorHandler';
// import { errorHandler } from '@/middlewares/errorHandler';
const app = (0, express_1.default)();
// app.use(cors());
// app.use(morgan('combined', {
//     stream: {
//         write: (message) => logger.info(message.trim()),
//     },
// }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// app.use(helmet());
// app.use(rateLimiter);
// app.use(errorHandler);
app.use('/api', routes_1.default);
//Health Check API
app.get('/health-check', (req, res) => {
    res.json({
        status: 'ok'
    });
});
exports.default = app;
