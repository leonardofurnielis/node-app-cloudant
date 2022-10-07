'use strict';

const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const { CloudantV1 } = require('@ibm-cloud/cloudant');

module.exports = (connection = 'CLOUDANT') => {
  if (
    process.env[`${connection}_URL`] &&
    process.env[`${connection}_APIKEY`]
  ) {

    const authenticator = new IamAuthenticator({
      apikey: process.env[`${connection}_APIKEY`]
    });

    const service = new CloudantV1({
      authenticator: authenticator
    });

    service.setServiceUrl(process.env[`${connection}_URL`]);

    return service;
  }
};
