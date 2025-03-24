import pino from 'pino';
import { NODE_ENV } from '@/config/env'

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname'
        },
    },
    level: NODE_ENV === 'production' ? 'info' : 'debug'
})

export default logger;