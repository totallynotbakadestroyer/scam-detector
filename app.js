require("dotenv-flow").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var history = require("connect-history-api-fallback");
const mongoose = require("mongoose");
const jwt = require("express-jwt");

const usersRouter = require("./routes/users.js");
const scammerRouter = require("./routes/scammers.js");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  jwt({ secret: process.env.SECRET_KEY, algorithms: ["HS256"] }).unless({
    path: ["/api/users/login", "/api/users/signup"],
  })
);

app.use("/api/users", usersRouter);
app.use("/api/protected", scammerRouter);

app.use(history());
app.use(express.static(path.join(__dirname, "public")));

const env = process.env.NODE_ENV;
const mongoURI =
  env === "test" ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on(
  "connected",
  console.log.bind(console, "Established connection with MongoDB")
);

module.exports = app;
