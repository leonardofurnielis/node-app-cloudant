'use strict';

module.exports = () => {
  return function ignoreFavicon(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
      const error = {
        message: `The Requested URL ('${req.path}') was not found on this server.`,
        details: {},
        http_response: {
          message:
            'The server successfully processed the request and is not returning any content.',
          code: 204,
        },
      };
      res.status(204).send(error);
    } else {
      next();
    }
  };
};
