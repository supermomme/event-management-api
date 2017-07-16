'use strict';

const users = require('./users/users.service.js');

const role = require('./role/role.service.js');

const event = require('./event/event.service.js');

const program = require('./program/program.service.js');

const purpose = require('./purpose/purpose.service.js');

const registration = require('./registration/registration.service.js');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(role);
  app.configure(event);
  app.configure(program);
  app.configure(purpose);
  app.configure(registration);
};
