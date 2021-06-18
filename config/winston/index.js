import winston from 'winston';
import appRoot from 'app-root-path';

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    format: winston.format.json(),
    maxsize: 5242880,
    maxFiles: 5,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.simple(),
    ),
    colorize: true,
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

export default logger;
