const functions = require("firebase-functions");
const { app } = require("./config/admin");
const { signup, signin } = require("./handlers/users");
const {
  createExam,
  getExams,
  addquestion,
  appendquestion,
  removequestion,
  launchexam,
  disableexam
} = require("./handlers/exams");
const { fbAuth } = require("./handlers/auth");
const { startexam, availableexams, submitexam } = require("./handlers/student");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
app.post("/signup", signup);
app.post("/signin", signin);
app.get("/exams", getExams);
app.post("/createExam", createExam);
app.post("/addquestion", addquestion);
app.post("/appendquestion", appendquestion);
app.post("/removequestion", removequestion);
app.post("/launchexam", launchexam);
app.post("/disableexam", disableexam);
app.post("/startexam", fbAuth, startexam);
app.get("/availableexams", fbAuth, availableexams);
app.post("/submitexam", fbAuth, submitexam);

exports.api = functions.https.onRequest(app);
