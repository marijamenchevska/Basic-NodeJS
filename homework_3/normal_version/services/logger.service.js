import path from 'path';
import EventEmitter from 'events';
import { appendData } from './db.service.js';

const logsPath = path.join(import.meta.dirname, '..', 'data', 'logs.txt');

class LoggerEmitter extends EventEmitter {}

const logger = new LoggerEmitter();

logger.on('log', message => {
    const currentTime = new Date().toISOString();

    const data = `
        ${message}
        Logged at: ${currentTime}
        ======================================
        `;

    appendData(logsPath, data);
});

export default logger;