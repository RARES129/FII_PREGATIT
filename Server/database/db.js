
require("dotenv").config();
const mongoose = require("mongoose");

const db_url = process.env.DB_URL;

mongoose.Promise = global.Promise;
const connectDB = async () => {
  try {
    await mongoose.connect(db_url);
    console.log("Database successfully connected!");
  } catch (error) {
    console.log("Could not connect to database : " + error);
  }
};

module.exports = connectDB;
