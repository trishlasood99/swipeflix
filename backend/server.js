// to load environment variables from a .env file into process.env
require('dotenv').config({ path: './config.env' });

//loading dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const verifyJWT = require('./middleware/verifyJWT');

const app = express();

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

// to verify that requests to protected resources have a valid JWT token
app.use('/api/protected',verifyJWT);

// TODO:  adding logging

// connecting to mongodb database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Models
const Movie = require('./models/movie.model');
const User = require('./models/user.model');
const UserPreference = require('./models/userpreferences.model');
const Friend = require('./models/friend.model');
const RightSwipe = require('./models/rightswipe.model');

// Routers
const movieRouter = require('./routes/movies.routes')(Movie);
const userRouter = require('./routes/auth.routes')(User);
const userPreferencesRouter = require('./routes/userpreferences.routes')(UserPreference);
const friendsRouter = require('./routes/friends.routes')(Friend);
const rightSwipeRouter = require('./routes/rightswipe.routes')(RightSwipe);

// Endpoints
app.use('/api/protected/movies', movieRouter);
app.use('/api/auth', userRouter);
app.use('/api/protected/user/preferences', userPreferencesRouter);
app.use('/api/protected/user/friends', friendsRouter);
app.use('/api/protected/swipe', rightSwipeRouter);

// simple api endpoint to root
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the SwipeFlix API!' });
});

// creating a port for express to listen on
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
