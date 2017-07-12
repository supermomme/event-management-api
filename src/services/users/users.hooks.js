'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const { checkPermissions, isPermitted } = require('feathers-permissions').hooks;
const { populate, when, discard, iff, isProvider, softDelete } = require('feathers-hooks-common');
const { hashPassword } = require('feathers-authentication-local').hooks;

const setRolePermission = require('../../hooks/set-role-permission');
const setDefaultPermissions = require('../../hooks/set-default-permissions');

const schema = {
  include: [
    {
      service: 'role',
      parentField: 'role',
      nameAs: 'role',
      childField: '_id'
    }
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
      )
    ],
    find: [
      populate({ schema: schema })
    ],
    get: [
      populate({ schema: schema }),
      setRolePermission()
    ],
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
