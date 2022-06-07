'use strict';

const Cloudant = require('@cloudant/cloudant');
const connections = require('./connections');

module.exports = (conn) => {
  if (
    connections[conn].uri &&
    connections[conn].iam_api_key &&
    connections[conn].adapter === 'cloudant'
  ) {
    return Cloudant({
      url: connections[conn].uri,
      maxAttempt: 5,
      plugins: [
        { iamauth: { iamApiKey: connections[conn].iam_api_key } },
        { retry: { retryDelayMultiplier: 4 } },
      ],
    });
  }
};
