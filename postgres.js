const Pool = require('pg').Pool;

const dbConfig = ({
  user: "kevinsouza",
  password: "",
  host: "localhost",
  port: 5432,
  database: "final_project_api"
});

if(process.env.DATABASE_URL){
	dbConfig.ssl = { rejectUnauthorized: false }
	dbConfig.connectionString = process.env.DATABASE_URL
}

const pool = new Pool(dbConfig)

module.exports = pool;
