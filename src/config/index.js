'use strict';

const app = require('express')();
const loopsailor = require('loopsailor');

// LoopSailor
// LoopSailor create "routes" and setup "middlewares", "policies", "cors" and "environments"
loopsailor.serve(app);

module.exports = app;
