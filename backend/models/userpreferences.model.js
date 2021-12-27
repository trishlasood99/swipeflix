const mongoose = require('mongoose');
const { Schema } = mongoose;

const userPreferencesSchema = {
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  genres: {type: [String], default: ['None']},
  imdb_rating: { type: Number, default: 0 },
  page: Number
}

module.exports = mongoose.model('UserPreference',userPreferencesSchema);
