// dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./postgres.js');

// middleware
app.use(cors());
app.use(express.json());


// routes
// create
app.post('/movies', async (req, res) => {
  try {
    const { title, year, director, genre, rating, rank, comments } = req.body;
    const newMovie = await pool.query(`INSERT INTO movies (title, year, director, genre, rating, rank, comments) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [title, year, director, genre, rating, rank, comments]);
    res.json(newMovie.rows);
  } catch (err) {
    console.log(err.message);
  }
})


// show
app.get('/movies', async (req, res) => {
  try {
    const allMovies = await pool.query("SELECT * FROM movies");
    res.json(allMovies.rows)
  } catch (err) {
    console.log(err.message);
  }
})



app.listen(5000, () => {
  console.log('Listening...');
})
