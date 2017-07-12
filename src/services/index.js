'use strict';

const users = require('./users/users.service.js');

const role = require('./role/role.service.js');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(role);
};