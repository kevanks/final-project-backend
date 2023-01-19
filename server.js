// dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./postgres.js');
const bcrypt = require('bcrypt')
const PORT = process.env.PORT || 5000





// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


// routes
// users
// create new user
app.post('/users/register', async (req, res) => {
  try {
    const { email, username, password } = req.body
    hashedPassword = await bcrypt.hash(req.body.password, 10)
    pool.query("SELECT * FROM users WHERE email = $1", [email], async (err, results) => {
      if (err) {
        console.log(err.message);
      }
      console.log(results.rows);
      if(results.rows.length > 0) {
        res.json("user is already created")
      } else {
        const newUser = await pool.query("INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *", [email, username, hashedPassword])
        res.json(newUser.rows)
      }
    })
  } catch (err) {
    console.log(err.message);
  }
})

// login user
app.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body
    pool.query("SELECT * FROM users WHERE email = $1", [email], async (err, results) => {
      if (err) {
        console.log(err.message);
      }
      if (results.rows[0].email === email) {
        if (bcrypt.compareSync(req.body.password, results.rows[0].password)) {
          res.json("logged in")
        } else {
          res.json("wrong password")
        }
      }


    })
  } catch (err) {
    console.log(err.message);
  }
})

// get all users
app.get('/users', async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users")
    res.json(allUsers.rows)
  } catch (err) {
    console.log(err.message);
  }
})







// movie routes
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

// show 1 movie
app.get('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params
    const oneMovie = await pool.query("SELECT * FROM movies WHERE id = $1", [id]);
    res.json(oneMovie.rows)
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
