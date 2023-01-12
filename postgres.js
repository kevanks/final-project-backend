const Client = require('pg').Client;

const client = new Client({
  user: "postgres",
  password: "admin1234",
  host: "localhost",
  port: 5432,
  database: "final_project_api"
});

module.exports = client;
