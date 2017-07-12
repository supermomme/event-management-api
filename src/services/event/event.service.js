'use strict';

// Initializes the `event` service on path `/event`
const createService = require('feathers-mongoose');
const createModel = require('../../models/event.model');
const hooks = require('./event.hooks');
const filters = require('./event.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'event',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/event', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('event');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
