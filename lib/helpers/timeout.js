'use strict';

/**
 * @function
 * @param {Number} Time to wait in milliseconds
 * @description This function is a async timeout
 */
const timeoutSync = (ms = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

module.exports = timeoutSync;
