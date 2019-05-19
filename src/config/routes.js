'use strict';

/**
 * Route Mappings
 *
 * Your routes map URLs to controllers.
 *
 * Any controller file (e.g. `api/controllers/authenticated.js`) can be accessed
 * below by its filename and his method, (e.g. "authenticated.login")
 *
 * If LoopSailor receives a URL that doesn't match any of the routes below,
 * The default 404 handler is triggered.
 */

module.exports = {
  v1: {
    'GET /foo': 'foo.index',
  },
};
