'use strict';

// event-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const event = new mongooseClient.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false, default: '' },
    creator: { type: mongooseClient.Schema.Types.ObjectId, ref: 'users', required: true },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('event', event);
};
