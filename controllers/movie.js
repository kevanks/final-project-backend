const express = require("express");
const router = express.Router();
const postgres = require('../postgres.js');

// show router
router.get('/', (req, res) => {
  postgres.query('SELECT * FROM movies ORDER BY ID ASC;', (err, results) => {
    res.json(results.rows)
  });
});
// create router
router.post('/', (req, res) => {
  postgres.query(`INSERT INTO movies (title, year, director, genre, rating, rank, comments) VALUES (${req.body.title}, ${req.body.year}, ${req.body.director}, ${req.body.genre}, ${req.body.rating}, ${req.body.rank}, ${req.body.comments})`, (err, results) => {
    postgres.query('SELECT * FROM movies ORDER BY ID ASC;', (err, results) => {
      res.json(results.rows)
    });
  });
});

// delete router


// edit router


module.exports = router;
