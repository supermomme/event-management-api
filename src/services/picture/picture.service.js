'use strict';

// Initializes the `picture` service on path `/picture`
const createService = require('feathers-mongoose');
const createModel = require('../../models/picture.model');
const hooks = require('./picture.hooks');
const filters = require('./picture.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'picture',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/picture', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('picture');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
