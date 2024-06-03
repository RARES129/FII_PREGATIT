const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const connectDB = require("./database/db");
const MongoDBStore = require("connect-mongodb-session")(session);

const generateSecretKey = () => {
  return require("crypto").randomBytes(32).toString("hex");
};

const secretKey = generateSecretKey();

const userRoute = require("./routes/user.route");

connectDB();

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const store = new MongoDBStore({
  uri: process.env.DB_URL,
  collection: "sessions",
});

store.on("error", function (error) {
  console.log(error);
});

store.clear(function (err) {
  if (err) {
    console.error("Error clearing sessions:", err);
  } else {
    console.log("All sessions cleared successfully.");
  }
});

app.use(
  session({
    secret: secretKey,
    resave: true,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
    },
  })
);

app.use("/users", userRoute, (req, res, next) => {
  console.log("Session ID:", req.sessionID);
  next();
});

app.use("/users", userRoute);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

app.use((req, res, next) => {
  res.status(404).send("Error 404!");
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
