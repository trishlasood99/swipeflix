const mongoose = require('mongoose');

const { Schema } = mongoose;

const matchSchema = new Schema({
  userId1: { type: Schema.Types.ObjectId, ref: 'User' },
  userId2: { type: Schema.Types.ObjectId, ref: 'User' },
  movieId: { type: Schema.Types.ObjectId, ref: 'Movie' },
  username1: String,
  username2: String,
  movieName: String,
  isDateSet: { type: Boolean, default: false },
  date: Date,
});

module.exports = mongoose.model('Match', matchSchema);
