// dependencies
const express = require("express");
const cors = require("cors");
const app = express();
const client = require('./postgres.js');

// middleware
app.use(cors());
app.use(express.json());


// routes
// create
app.post('/movies', async (req, res) => {
  try {
    const title = req.body
    const newMovie = await client.query(`INSERT INTO movies (title) VALUES (${title}) RETURNING *`)
    res.json(newMovie.rows)
  } catch (err) {
    log(err.message)
  }
})

// show
// app.get('/movies', async (req, res) => {
//     client.query('SELECT * FROM people ORDER BY id ASC;', (err, results) => {
//         res.json(results.rows)
//     });
// });



app.listen(process.env.PORT || 5000, () => {
  console.log('Listening...');
})
