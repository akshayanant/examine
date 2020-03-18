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
  disableexam,
  questions,
  activeExams
} = require("./handlers/exams");
const { fbAuth } = require("./handlers/auth");
const { startexam, availableexams, submitexam } = require("./handlers/student");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

//admin routes
app.get("/exams", getExams);
app.get("/activeexams", activeExams);

app.post("/createExam", createExam);
app.post("/launchexam", launchexam);
app.post("/disableexam", disableexam);

app.get("/questions", questions);
app.post("/addquestion", addquestion);
app.post("/appendquestion", appendquestion);
app.post("/removequestion", removequestion);

//user routes
app.post("/signup", signup);
app.post("/signin", signin);
app.get("/availableexams", fbAuth, availableexams);
app.post("/startexam", fbAuth, startexam);
app.post("/submitexam", fbAuth, submitexam);

exports.api = functions.https.onRequest(app);
