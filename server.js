// dependencies
const express = require("express");
const cors = require("cors");
const app = express();
const postgres = require('./postgres.js');

// middleware
app.use(cors());
app.use(express.json());


// router
const movieController = require('./controllers/movie.js');
app.use('/movies', movieController);

postgres.connect();

app.listen(process.env.PORT || 5000, () => {
  console.log('Listening...');
})
