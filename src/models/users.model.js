'use strict';

// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({

    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: false },
    address: {
      town: { type: String, required: false },
      zip: { type: String, required: false },
      street: { type: String, required: false },
    },

    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    permissions: [{type:String, required: false }],
    role: { type: mongooseClient.Schema.Types.ObjectId, ref: 'role', required: false },


    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('users', users);
};
