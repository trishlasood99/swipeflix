const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// to load environment variables from a .env file into process.env
require('dotenv').config({ path: './config.env' });

// **************
// **middleware**
// **************

// to enable cors for a front-end application
const corsOptions = {
  origin: 'http://localhost:4200',
};
app.use(cors(corsOptions));

// to parse body of requests of content-type - application/json
app.use(bodyParser.json());

// to parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// TODO:  adding logging

// connecting to mongodb database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Models
const Movie = require('./models/movie.model');
const User = require('./models/user.model');

// Routers
const movieRouter = require('./routes/movies.routes')(Movie);
const userRouter = require('./routes/auth.routes')(User);

app.use('/api/movies', movieRouter);
app.use('/api/auth', userRouter);

// simple api endpoint to root
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the SwipeFlix API!' });
});

// creating a port for express to listen on
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
