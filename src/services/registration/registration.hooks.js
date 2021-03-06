'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const { checkPermissions, isPermitted } = require('feathers-permissions').hooks;
const { populate, when, discard, iff, isProvider, softDelete } = require('feathers-hooks-common');
const { hashPassword } = require('feathers-authentication-local').hooks;

const schema = {
  include: [
    { service: 'event', parentField: 'event', nameAs: 'event', childField: '_id' },
    { service: 'users', parentField: 'user', nameAs: 'user', childField: '_id' },
    { service: 'purpose', parentField: 'purpose', nameAs: 'purpose', childField: '_id' }
  ]
};

const authAndPermissions = [
  authenticate('jwt'),
  checkPermissions({ service: 'registration' }),
  iff(isProvider('external'), isPermitted())
]

module.exports = {
  before: {
    all: [...authAndPermissions],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [populate({ schema: schema })],
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
