// dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./postgres.js');
const PORT = process.env.PORT || 5000



// middleware
app.use(cors());
app.use(express.json());



// routes
// create a movie
app.post('/movies', async (req, res) => {
  try {
    const { title, year, director, genre, rating, rank, comments, imgurl } = req.body;
    const newMovie = await pool.query("INSERT INTO movies (title, year, director, genre, rating, rank, comments, imgurl) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [title, year, director, genre, rating, rank, comments, imgurl]);
    res.json(newMovie.rows);
  } catch (err) {
    console.log(err.message);
  }
})

// show all movies
app.get('/movies', async (req, res) => {
  try {
    const allMovies = await pool.query("SELECT * FROM movies ORDER BY rank ASC");
    res.json(allMovies.rows)
  } catch (err) {
    console.log(err.message);
  }
})


// update a movie
app.put('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, year, director, genre, rating, rank, comments, imgurl } = req.body;
    const updateMovie = await pool.query("UPDATE movies SET title = $1, year = $2, director = $3, genre = $4, rating = $5, rank = $6, comments = $7, imgurl = $8 WHERE id = $9", [title, year, director, genre, rating, rank, comments, imgurl, id])
    res.json("Movie was updated")
  } catch (err) {
    console.log(err.message);
  }
})

// delete movie
app.delete('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await pool.query('DELETE FROM movies WHERE ID = $1', [id])
    res.json("Movie was deleted")
  } catch (err) {
    console.log(err.message);
  }
})

app.listen(PORT, () => {
  console.log('Listening...');
})
