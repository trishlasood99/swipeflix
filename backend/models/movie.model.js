const mongoose = require('mongoose');

const { Schema } = mongoose;

const movieSchema = new Schema({
  director_name: String,
  duration: Number,
  genres: String,
  movie_imdb_link: String,
  title_year: Number,
  imdb_score: Number,
  movie_title: String,
});

module.exports = mongoose.model('Movie', movieSchema);
