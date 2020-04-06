const functions = require("firebase-functions");
const { app } = require("./config/admin");
const { signup, signin, signout } = require("./handlers/users");
const {
  createExam,
  getExams,
  addquestion,
  appendquestion,
  removequestion,
  launchexam,
  disableexam,
  questions,
  activeExams,
  getExamDetails,
  getQuestionDetails,
  getQuestionIDs,
} = require("./handlers/exams");
const { fbAuth } = require("./handlers/auth");
const {
  startexam,
  availableexams,
  submitexam,
  allExams,
  pastExams,
  gradeSubmission,
  getGrades,
} = require("./handlers/student");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

//admin routes
app.get("/exams", getExams);
app.get("/activeexams", activeExams);
app.get("/getexamdetails/:examID", getExamDetails);

app.post("/createExam", createExam);
app.post("/launchexam", launchexam);
app.post("/disableexam", disableexam);

app.get("/questions", questions);
app.get("/getquestionids", getQuestionIDs);
app.get("/getquestiondetails/:questionID", getQuestionDetails);

app.post("/addquestion", addquestion);
app.post("/appendquestion", appendquestion);
app.post("/removequestion", removequestion);

//user routes
app.post("/signup", signup);
app.post("/signin", signin);
app.post("/signout", signout);

app.get("/availableexams", fbAuth, availableexams);
app.get("/allexams", fbAuth, allExams);
app.get("/pastexams", fbAuth, pastExams);
app.get("/getgrades/:submissionID", fbAuth, getGrades);

app.post("/startexam", fbAuth, startexam);
app.post("/submitexam", fbAuth, submitexam);
app.post("/gradesubmission", fbAuth, gradeSubmission);

exports.api = functions.https.onRequest(app);
