const path = require("path");
require("dotenv").config({
  path: path.join(__dirname + "/../", ".env.local"),
});
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const User = require("../models/UserSchema");
const assert = chai.assert;
const bcrypt = require("bcrypt");

chai.use(chaiHttp);

describe("Login", () => {
  before(async () => {
    let user = new User({
      username: "TestUser",
      email: "TestEmail@test.com",
      password: "testtest",
    });
    await user.save();
  });
  after(async () => {
    await User.deleteMany({});
  });
  describe("POST /api/users/login", () => {
    it("should return 200 if credentials are right and user exists", (done) => {
      chai
        .request(app)
        .post("/api/users/login")
        .send({ email: "TestEmail@test.com", password: "testtest" })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.exists(res.header.authorization);
          done();
        });
    });
    it("should return 400 if password is missing", (done) => {
      chai
        .request(app)
        .post("/api/users/login")
        .send({ email: "TestEmail@test.com" })
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.notExists(res.header.authorization);
          done();
        });
    });
    it("should return 401 if password is wrong", (done) => {
      chai
        .request(app)
        .post("/api/users/login")
        .send({ email: "TestEmail@test.com", password: "testtesttest" })
        .end((err, res) => {
          assert.equal(res.status, 401);
          assert.notExists(res.header.authorization);
          done();
        });
    });
    it("should return 401 if no user with provided email", (done) => {
      chai
        .request(app)
        .post("/api/users/login")
        .send({ email: "TestWrongEmail@test.com", password: "testtest" })
        .end((err, res) => {
          assert.equal(res.status, 401);
          assert.notExists(res.header.authorization);
          done();
        });
    });
    it("should return 400 email is missing", (done) => {
      chai
        .request(app)
        .post("/api/users/login")
        .send({ password: "testtest" })
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.notExists(res.header.authorization);
          done();
        });
    });
    it("should return 400 if nothing is provided", (done) => {
      chai
        .request(app)
        .post("/api/users/login")
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.notExists(res.header.authorization);
          done();
        });
    });
  });
});
describe("Signup", () => {
  afterEach(async () => {
    await User.deleteMany({});
  });
  describe("POST /api/users/signup", () => {
    it("should return 201 if user successfully registered", (done) => {
      chai
        .request(app)
        .post("/api/users/signup")
        .send({
          username: "TestUser",
          email: "TestEmail@test.com",
          password: "testtest",
        })
        .end((err, res) => {
          assert.equal(res.status, 201);
          done();
        });
    });
    it("should return 201 and password should be encrypted", (done) => {
      chai
        .request(app)
        .post("/api/users/signup")
        .send({
          username: "TestUser",
          email: "TestEmail@test.com",
          password: "testtest",
        })
        .end((err, res) => {
          assert.equal(res.status, 201);
          User.findOne({email: "TestEmail@test.com"}, (err, user) => {
            bcrypt.compare("testtest", user.password, (err, res) => {
              assert.isTrue(res);
              done();
            })
          })
        });
    });
    it("should return 400 if username is missing", (done) => {
      chai
        .request(app)
        .post("/api/users/signup")
        .send({
          password: "testtest",
        })
        .end((err, res) => {
          assert.equal(res.status, 400);
          done();
        });
    });
    it("should return 400 if email is missing", (done) => {
      chai
        .request(app)
        .post("/api/users/signup")
        .send({
          username: "TestUser",
          password: "testtest",
        })
        .end((err, res) => {
          assert.equal(res.status, 400);
          done();
        });
    });
    it("should return 400 if password is missing", (done) => {
      chai
        .request(app)
        .post("/api/users/signup")
        .send({
          username: "TestUser",
          email: "TestEmail@test.com",
        })
        .end((err, res) => {
          assert.equal(res.status, 400);
          done();
        });
    });
    it("should return 400 if nothing is provided", (done) => {
      chai
        .request(app)
        .post("/api/users/signup")
        .send({
          username: "TestUser",
          email: "TestEmail@test.com",
        })
        .end((err, res) => {
          assert.equal(res.status, 400);
          done();
        });
    });
  });
});
