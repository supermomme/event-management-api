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
    event: { type: mongooseClient.Schema.Types.ObjectId, ref: 'event', required: true },
    permissions: [{ type: String, required: true }],

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('purpose', purpose);
};
