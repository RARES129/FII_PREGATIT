require("dotenv").config();

db_url = process.env.DB_URL;

module.exports = {
  db: db_url,
};
