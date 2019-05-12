'use strict';

const app = require('express')();
const strongsailor = require('strongsailor');

// StrongSailor
// StrongSailor create "routes" and setup "middlewares", "policies", "cors" and "environments"
strongsailor.serve(app);

module.exports = app;
