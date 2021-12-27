const mongoose = require('mongoose');
const { Schema } = mongoose;

const friendSchema = new Schema({
  friend1: { type: Schema.Types.ObjectId, ref: 'User'},
  friend2: { type: Schema.Types.ObjectId, ref: 'User'},
  username1: String,
  username2: String,
});

module.exports = mongoose.model('Friend',friendSchema);
