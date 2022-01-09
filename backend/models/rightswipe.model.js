const mongoose = require('mongoose');

const { Schema } = mongoose;

const rightSwipeSchema = new Schema({
  movieId: { type: Schema.Types.ObjectId, ref: 'Movie' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  movieName: String,
});

module.exports = mongoose.model('RightSwipe', rightSwipeSchema);
