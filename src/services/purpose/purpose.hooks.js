'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const { checkPermissions, isPermitted } = require('feathers-permissions').hooks;
const { iff, isProvider, populate } = require('feathers-hooks-common');

const authAndPermissions = [
  authenticate('jwt'),
  checkPermissions({ service: 'purpose' }),
  iff(isProvider('external'), isPermitted())
]

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [...authAndPermissions],
    update: [...authAndPermissions],
    patch: [...authAndPermissions],
    remove: [...authAndPermissions]
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
