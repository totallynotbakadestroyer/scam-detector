require("dotenv-flow").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const history = require("connect-history-api-fallback");
const mongoose = require("mongoose");
const jwt = require("express-jwt");

const authRouter = require("./routes/auth.js");
const reportsRouter = require("./routes/reports.js");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(
  jwt({ secret: process.env.SECRET_KEY, algorithms: ["HS256"] }).unless({
    path: /\/api\/auth.*/,
  })
);

app.use("/api/auth", authRouter);
app.use("/api", reportsRouter);

app.use(history());

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
