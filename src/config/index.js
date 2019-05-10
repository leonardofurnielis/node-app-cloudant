'use strict';

const app = require('express')();
const harbor = require('harbor-js');

// Harbor-js
// Harbor create "routes" and setup "middlewares", "policies", "cors" and "environments"
harbor.serve(app);

module.exports = app;
