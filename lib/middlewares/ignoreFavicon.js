'use strict';

module.exports = () => {
  return function ignoreFavicon(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
      const error = {
        error: {
          code: 204,
          message: 'NO CONTENT',
          details: 'The server successfully processed the request and is not returning any content',
        },
      };
      res.status(204).send(error);
    } else {
      next();
    }
  };
};
