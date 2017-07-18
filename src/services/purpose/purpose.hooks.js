'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const { checkPermissions, isPermitted } = require('feathers-permissions').hooks;
const { iff, isProvider, populate } = require('feathers-hooks-common');

const authAndPermissions = [
  authenticate('jwt'),
  checkPermissions({ service: 'purpose' }),
  iff(isProvider('external'), isPermitted())
]

const schema = {
  include: [
    {
      service: 'event',
      parentField: 'event',
      nameAs: 'event',
      childField: '_id'
    }
  ]
};

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
    get: [populate({ schema: schema })],
    create: [populate({ schema: schema })],
    update: [populate({ schema: schema })],
    patch: [populate({ schema: schema })],
    remove: [populate({ schema: schema })]
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
