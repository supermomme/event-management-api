'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const { checkPermissions, isPermitted } = require('feathers-permissions').hooks;
const { iff, isProvider } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      checkPermissions({ service: 'role' }),
      iff(isProvider('external'), isPermitted())
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
