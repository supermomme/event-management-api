'use strict';

// purpose-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const purpose = new mongooseClient.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false, default: '' },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('purpose', purpose);
};
