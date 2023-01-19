const Pool = require('pg').Pool;

const pool = new Pool({
  user: "kevinsouza",
  password: "",
  host: "localhost",
  port: 5432,
  database: "final_project_api"
});


module.exports = pool;
