'use strict';

// registration-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const registration = new mongooseClient.Schema({
    event: { type: mongooseClient.Schema.Types.ObjectId, ref: 'event', required: true },
    user: { type: mongooseClient.Schema.Types.ObjectId, ref: 'users', required: true },
    purpose: { type: mongooseClient.Schema.Types.ObjectId, ref: 'purpose', required: true },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('registration', registration);
};
