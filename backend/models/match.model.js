const mongoose = require('mongoose');
const { Schema } = mongoose;

const matchSchema = new Schema({
  userId1: { type: Schema.Types.ObjectId, ref: 'User'},
  userId2: { type: Schema.Types.ObjectId, ref: 'User'},
  movieId: { type: Schema.Types.ObjectId, ref: 'Movie'},
  isDateSet: { type: Boolean, default: false},
  date: Date,
});

module.exports = mongoose.model('Match', matchSchema);
