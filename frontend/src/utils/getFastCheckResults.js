const resultType = [
  {
    type: "success",
    text:
      "There is nothing bad about this user in our database. Stay cautious anyway!"
  },
  {
    type: "warning",
    text:
      "This user was reported as a potential scammer. However, we can't proof it yet. Stay cautious!"
  },
  {
    type: "error",
    text: "Yep, that is a 100% percent scammer. Stay cautious."
  }
];
const getFastCheckResults = (status, userId) => {
  switch (status) {
    case "Warning":
      this.result = { ...resultType[1], id: userId };
      break;
    case "Scammer":
      this.result = { ...resultType[2], id: userId };
      break;
    default:
      this.result = { ...resultType[0], id: userId };
      break;
  }
};

export default getFastCheckResults;
