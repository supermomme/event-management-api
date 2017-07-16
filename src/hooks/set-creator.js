'use strict';
const errors = require('feathers-errors');

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    if (hook.type !== "before") return Promise.reject(new errors.Unprocessable('setCreator must be a before hook'));
    if (hook.method !== "create" && hook.method !== "update") return Promise.reject(new errors.Unprocessable('setCreator must be a before hook'));
    hook.data.creator = hook.params.user._id || hook.params.user;
    return Promise.resolve(hook);
  };
};
