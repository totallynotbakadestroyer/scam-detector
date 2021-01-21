const path = require("path");
require("dotenv").config({
  path: path.join(__dirname + "/../", ".env.local")
});
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const Report = require("../models/ReportSchema");
const assert = chai.assert;
const helper = require("./helpers.js");
const User = require("../models/UserSchema.js");

const baseUrl = "/api/reports";

chai.use(chaiHttp);
let jwt;

const userId = helper.initialUsers[0]._id;
const userCreatedReports = helper.initialReports.filter(
  report => report.creator === userId
);

describe("Reports", () => {
  before(async () => {
    await User.deleteMany({});
    jwt = await helper.generateTestJwt();
  });
  beforeEach(async () => {
    await Report.deleteMany({});

    const reportObjects = helper.initialReports.map(
      report => new Report(report)
    );
    const promiseArray = reportObjects.map(report => report.save());
    await Promise.all(promiseArray);
  });
  describe("GET /api/reports", () => {
    it("should return only reports user created himself", done => {
      chai
        .request(app)
        .get(baseUrl)
        .set("Authorization", jwt)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.lengthOf(res.body, userCreatedReports.length);
          assert.sameDeepMembers(res.body, userCreatedReports);
          done();
        });
    });
    it("should return 401 if user is not authorized", done => {
      chai
        .request(app)
        .get(baseUrl)
        .end((err, res) => {
          assert.equal(res.status, 401);
          done();
        });
    });
    it("should return empty object if not authorized", done => {
      chai
        .request(app)
        .get(baseUrl)
        .end((err, res) => {
          assert.isObject(res.body);
          assert.isEmpty(res.body);
          done();
        });
    });
    describe("POST /api/reports", () => {
      it("should return 201 and saved report", done => {
        chai
          .request(app)
          .post(baseUrl)
          .set("Authorization", jwt)
          .send(helper.reportToCreate)
          .end((err, res) => {
            assert.equal(res.status, 201);
            assert.equal(res.body.review, helper.reportToCreate.review);
            done();
          });
      });
      it("should actually create the report so it will appear in db", done => {
        chai
          .request(app)
          .post(baseUrl)
          .set("Authorization", jwt)
          .send(helper.reportToCreate)
          .end(async () => {
            const reportsInDb = await helper.reportsInDb();
            assert.isNotEmpty(reportsInDb);
            assert.include(
              reportsInDb.map(x => x.review),
              helper.reportToCreate.review
            );
            done();
          });
      });
      it("new report should appear with all previously created", async () => {
        await chai
          .request(app)
          .post(baseUrl)
          .set("Authorization", jwt)
          .send(helper.reportToCreate);
        const res = await chai
          .request(app)
          .get(baseUrl)
          .set("Authorization", jwt);
        assert.isNotEmpty(res.body);
        assert.include(
          res.body.map(x => x.review),
          helper.reportToCreate.review
        );
        assert.lengthOf(res.body, userCreatedReports.length + 1);
      });
      it("should return 401 if non authorized", done => {
        chai
          .request(app)
          .post(baseUrl)
          .send(helper.reportToCreate)
          .end((err, res) => {
            console.log(res.body);
            assert.equal(res.status, 401);
            assert.isObject(res.body);
            assert.isEmpty(res.body);
            done();
          });
      });
    });
  });
  describe("PUT /api/reports/:id", () => {
    const updatedReport = { ...helper.reportToCreate, review: "updatedreview" };
    beforeEach(async () => {
      await Report.findByIdAndDelete(helper.reportToCreate._id);
      await new Report({ ...helper.reportToCreate, creator: userId }).save();
    });
    it("should return 200 and updated report", done => {
      chai
        .request(app)
        .put(`${baseUrl}/${helper.reportToCreate._id}`)
        .set("Authorization", jwt)
        .send(updatedReport)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.review, updatedReport.review);
          done();
        });
    });
    it("should actually update the object so it will appear in db", done => {
      chai
        .request(app)
        .put(`${baseUrl}/${helper.reportToCreate._id}`)
        .set("Authorization", jwt)
        .send(updatedReport)
        .end(async () => {
          const reportInDb = await Report.findById(helper.reportToCreate._id);
          assert.notEqual(reportInDb.review, helper.reportToCreate.review);
          assert.equal(reportInDb.review, updatedReport.review);
          done();
        });
    });
    it("should return 403 if trying to update approved report", done => {
      chai
        .request(app)
        .put(`${baseUrl}/${helper.initialReports[0]._id}`)
        .set("Authorization", jwt)
        .send(updatedReport)
        .end((err, res) => {
          assert.equal(res.status, 403);
          done();
        });
    });
    it("report in db should stay the same if it is already approved", done => {
      chai
        .request(app)
        .put(`${baseUrl}/${helper.initialReports[0]._id}`)
        .set("Authorization", jwt)
        .send(updatedReport)
        .end(async () => {
          const reportInDb = await Report.findById(helper.reportToCreate._id);
          assert.equal(reportInDb.review, helper.reportToCreate.review);
          assert.notEqual(reportInDb.review, updatedReport.review);
          done();
        });
    });
  });
  describe("DELETE /api/reports/:id", () => {
    beforeEach(async () => {
      await Report.findByIdAndDelete(helper.reportToCreate._id);
      await new Report({ ...helper.reportToCreate, creator: userId }).save();
    });
    it("should return 204 if deleted successfully", done => {
      chai
        .request(app)
        .delete(`${baseUrl}/${helper.reportToCreate._id}`)
        .set("Authorization", jwt)
        .send()
        .end((err, res) => {
          assert.equal(res.status, 204);
          assert.isEmpty(res.body);
          done();
        });
    });
    it("should actually delete report so it wont appear in db", async () => {
      const reportsBeforeDeletion = await helper.reportsInDb();
      await chai
        .request(app)
        .delete(`${baseUrl}/${helper.reportToCreate._id}`)
        .send()
        .set("Authorization", jwt);
      const reportsAfterDeletion = await helper.reportsInDb();
      assert.equal(
        reportsAfterDeletion.length,
        reportsBeforeDeletion.length - 1
      );
    });
    it("should return 403 if trying to delete approved report", done => {
      chai
        .request(app)
        .delete(`${baseUrl}/${helper.initialReports[0]._id}`)
        .set("Authorization", jwt)
        .end((err, res) => {
          assert.equal(res.status, 403);
          done();
        });
    });
    it("should not delete report if error", done => {
      chai
        .request(app)
        .delete(`${baseUrl}/${helper.initialReports[0]._id}`)
        .set("Authorization", jwt)
        .end(async () => {
          const reportInDb = await Report.findById(
            helper.initialReports[0]._id
          );
          assert.isNotEmpty(reportInDb);
          assert.equal(reportInDb.review, helper.initialReports[0].review);
          done();
        });
    });
  });
});
