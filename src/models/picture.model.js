'use strict';

// picture-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const picture = new mongooseClient.Schema({
    uri: { type: String, required: true },
    checked: { type: Boolean, required: true, default: false },

    deleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('picture', picture);
};
