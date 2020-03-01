'use strict';

const path = require('path');
const log4js = require('log4js');

log4js.configure({
  appenders: {
    stdout: { type: 'stdout' },
    stderr: { type: 'stderr' },
    error: {
      type: 'file',
      filename: path.join(__dirname, '../tmp/error.log'),
      maxLogSize: 2000000,
    },
    fileErrorFilter: {
      type: 'logLevelFilter',
      appender: 'error',
      level: 'error',
      maxLevel: 'error',
    },
    stderrFilter: {
      type: 'logLevelFilter',
      appender: 'stderr',
      level: 'error',
      maxLevel: 'error',
    },
    stdoutFilter: {
      type: 'logLevelFilter',
      appender: 'stdout',
      level: 'debug',
      maxLevel: 'warn',
    },
  },
  categories: {
    default: {
      appenders: ['fileErrorFilter', 'stderrFilter', 'stdoutFilter'],
      level: 'debug',
    },
  },
});

module.exports = (name = 'sample-node') => {
  const logger = log4js.getLogger(name);
  logger.level = process.env.LOGGER_LEVEL;

  global.console.debug = (...args) => {
    logger.debug(...args);
  };

  global.console.log = (...args) => {
    logger.debug(...args);
  };

  global.console.info = (...args) => {
    logger.info(...args);
  };

  global.console.warn = (...args) => {
    logger.warn(...args);
  };

  global.console.error = (...args) => {
    logger.error(...args);
  };
};
