'use strict';

// program-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const program = new mongooseClient.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false, default: '' },
    leader: { type: mongooseClient.Schema.Types.ObjectId, ref: 'users', required: true },
    event: { type: mongooseClient.Schema.Types.ObjectId, ref: 'event', required: true },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('program', program);
};
