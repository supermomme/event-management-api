'use strict';

// Initializes the `purpose` service on path `/purpose`
const createService = require('feathers-mongoose');
const createModel = require('../../models/purpose.model');
const hooks = require('./purpose.hooks');
const filters = require('./purpose.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'purpose',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/purpose', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('purpose');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
