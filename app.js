require("dotenv-flow").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const history = require("connect-history-api-fallback");
const mongoose = require("mongoose");
const jwt = require("express-jwt");

const usersRouter = require("./routes/users.js");
const reportsRouter = require("./routes/reports.js");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  jwt({ secret: process.env.SECRET_KEY, algorithms: ["HS256"] }).unless({
    path: ["/api/users/login", "/api/users/signup"]
  })
);

app.use("/api/users", usersRouter);
app.use("/api", reportsRouter);

app.use(history());
app.use(express.static(path.join(__dirname, "public")));

const env = process.env.NODE_ENV;
const mongoURI =
  env === "test" ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on(
  "connected",
  console.log.bind(console, "Established connection with MongoDB")
);

module.exports = app;
