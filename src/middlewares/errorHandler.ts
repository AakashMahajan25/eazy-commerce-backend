import { Request, Response, NextFunction } from "express";
import logger from '@/utils/logger';
import { NODE_ENV } from '@/config/env'

interface ErrorResponse {
    status?: number;
    message: string;
    stack?: string;
}

export const errorHandler = (
    err: ErrorResponse,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.status || 500;
    const response: ErrorResponse = {
        message: err.message || 'Internal Server Error',
    };

    if (NODE_ENV === 'development') {
        response.stack = err.stack;
    }

    logger.error({
        method: req.method,
        url: req.url,
        status: statusCode,
        message: err.message,
        stack: NODE_ENV === 'development' ? err.stack : undefined,
    });

    res.status(statusCode).json(response);
}