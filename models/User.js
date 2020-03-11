const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, min: 12, required: true },
    created: { type: Date, default: Date.now, required: true },
    updated: { type: Date, default: Date.now, required: true },
    last_login: { type: Date, default: Date.now, required: true },
    current_login: { type: Date, default: Date.now, required: true }
  },
  { collection: 'Users' }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
