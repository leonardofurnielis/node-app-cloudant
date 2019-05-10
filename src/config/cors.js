'use strict';

/**
 * Cross-Origin (CORS) Settings
 *
 * CORS is like a more modern version of JSONP-- it allows your server/API
 * to successfully respond to requests from client-side JavaScript code
 * running on some other domain (e.g. google.com)
 * Unlike JSONP, it works with POST, PUT, and DELETE requests
 */

module.exports = {
  origin: '*',
  methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH',
};
