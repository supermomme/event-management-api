'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const { checkPermissions, isPermitted } = require('feathers-permissions').hooks;
const { iff, isProvider, populate, softDelete } = require('feathers-hooks-common');

const authAndPermissions = [
  authenticate('jwt'),
  checkPermissions({ service: 'picture' }),
  iff(isProvider('external'), isPermitted())
]

module.exports = {
  before: {
    all: [ ...authAndPermissions, softDelete() ],
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
