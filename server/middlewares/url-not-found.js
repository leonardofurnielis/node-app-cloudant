'use strict';

module.exports = () => {
  return function raise_url_not_found_error(req, res) {
    const not_found = {
      error: {
        status_code: 404,
        message: `Cannot found '${req.url}' on this server`,
        code: 'NOT_FOUND',
      },
    };
    return res.status(404).json(not_found);
  };
};
