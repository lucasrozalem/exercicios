import 'winston-daily-rotate-file';
import moment from 'moment';
import path from 'path';
import winston from 'winston';

const { createLogger, transports, format } = winston;
const { colorize, simple, combine, prettyPrint } = format;
const dev = process.env.NODE_ENV !== 'production';

const appendCustomTimestamp = format((info) => {
  info.timestamp = moment()
    .locale('pt-BR')
    .format('DD-MM-YYYY-HH:mm');
  return info;
});

const logger = createLogger({
  transports: [],
  exitOnError: false
});

if (dev) {
  logger.add(
    new transports.Console({
      level: 'debug',
      format: combine(colorize(), simple()),
      eol: '\n'
    })
  );
} else {
  logger.add(
    new transports.DailyRotateFile({
      level: 'error',
      json: true,
      filename: path.join(__dirname, 'logs', 'errors-%DATE%.log'),
      datePattern: 'YYYY-MM-DD-HH:mm',
      zippedArchive: true,
      maxSize: '50m',
      maxFiles: '1d',
      format: combine(appendCustomTimestamp(), prettyPrint())
    })
  );
}

export default logger;