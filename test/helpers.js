const User = require("../models/UserSchema.js");
const Report = require("../models/ReportSchema.js");
const jwt = require("jsonwebtoken");

const initialUsers = [
  {
    _id: "5fadc09cfe468f0d8dbcd989",
    username: "TestUser",
    email: "TestEmail@test.com",
    password: "testtest"
  },
  {
    username: "AnotherTestUser",
    email: "CoolEmail@test.com",
    password: "testtest"
  },
  {
    username: "AndAnotherOne",
    email: "UnCoolEmail@test.com",
    password: "testtest"
  }
];

const initialReports = [
  {
    _id: "6008ad0679302152d325bfcb",
    review: "Detriuss ortum!",
    link: "iamalinktrustme",
    status: "approved",
    description: "Cur olla observare?",
    proofs: "proofs",
    website: "vk.com",
    type: "user",
    __v: 0,
    creator: "5fadc09cfe468f0d8dbcd989"
  },
  {
    _id: "6008ad012075b87a0379eeb7",
    review: "Vitas studere",
    link: "iamalinktrustme",
    status: "approved",
    description: "Cur olla observare?",
    proofs: "proofs",
    website: "vk.com",
    type: "user",
    __v: 0,
    creator: "6008acda72ef0cc2a203d555"
  },
  {
    _id: "6008acfdab77ecfc5f2d1abe",
    review: "Ollas mori! ",
    link: "iamalinktrustme",
    status: "approved",
    description: "Cur olla observare?",
    proofs: "proofs",
    website: "vk.com",
    type: "user",
    __v: 0,
    creator: "6008ace88d25b01275e406fc"
  },
  {
    _id: "6008acf991ef17d944528cdc",
    review: "Domesticus byssuss ducunt ad hydra.",
    link: "iamalinktrustme",
    status: "approved",
    description: "Cur olla observare?",
    proofs: "proofs",
    website: "vk.com",
    type: "user",
    __v: 0,
    creator: "5fadc09cfe468f0d8dbcd989"
  },
  {
    _id: "6008acf3c80627be7b774f2e",
    review: "Competitions ortum!",
    link: "iamalinktrustme",
    status: "approved",
    description: "Cur olla observare?",
    proofs: "proofs",
    website: "vk.com",
    type: "user",
    __v: 0,
    creator: "5fadc09cfe468f0d8dbcd989"
  },
  {
    _id: "6008acee4b31b0d889c396b2",
    review: "Humani generiss experimentum!",
    link: "iamalinktrustme",
    status: "approved",
    description: "Cur olla observare?",
    proofs: "proofs",
    website: "vk.com",
    type: "user",
    __v: 0,
    creator: "5fadc09cfe468f0d8dbcd989"
  }
];

const reportToCreate = {
  _id: "6009691f591ce8508329c79f",
  review: "Cool test report",
  link: "iamalinktrustme",
  description: "do androids dream of test reports",
  proofs: "proofs",
  website: "vk.com",
  type: "user"
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toObject());
};

const reportsInDb = async () => {
  const reports = await Report.find({});
  return reports.map(report => report.toObject());
};

const generateTestJwt = async () => {
  let userToCreate = new User(initialUsers[0]);
  let user = await userToCreate.save();
  return `Bearer ${await jwt.sign(
    { userId: user._id, username: user.username },
    process.env.SECRET_KEY
  )}`;
};

module.exports = {
  initialReports,
  initialUsers,
  usersInDb,
  reportsInDb,
  generateTestJwt,
  reportToCreate
}
