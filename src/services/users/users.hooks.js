'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const { checkPermissions, isPermitted } = require('feathers-permissions').hooks;
const { populate, when, discard, iff, isProvider, softDelete } = require('feathers-hooks-common');
const { hashPassword } = require('feathers-authentication-local').hooks;

const setExtraPermissions = require('../../hooks/set-extra-permissions');
const setDefaultPermissions = require('../../hooks/set-default-permissions');

const schema = {
  include: [
    { service: 'role', parentField: 'role', nameAs: 'role', childField: '_id' },
    { service: 'picture', parentField: 'picture', nameAs: 'picture', childField: '_id' }
  ]
};

const authAndPermissions = [
  authenticate('jwt'),
  checkPermissions({ service: 'users' }),
  iff(isProvider('external'), isPermitted())
]

module.exports = {
  before: {
    all: [],
    find: [ ...authAndPermissions ],
    get: [ ...authAndPermissions ],
    create: [ hashPassword() ],
    update: [ ...authAndPermissions, hashPassword() ],
    patch: [ ...authAndPermissions, hashPassword() ],
    remove: [ ...authAndPermissions ]
  },

  after: {
    all: [
      when(
        hook => hook.params.provider,
        discard('password')
      ),
      populate({ schema: schema })
    ],
    find: [],
    get: [ setExtraPermissions() ],
    create: [setDefaultPermissions({service:'users'})],
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
