'use strict';

/**
 * Policies Mappings
 *
 * Policies are simple functions which run `before` your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, (e.g. "authenticated")
 */

module.exports = {
  '*': true,
};
