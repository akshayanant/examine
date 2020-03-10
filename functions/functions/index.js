const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
app.get("/exams", (request, response) => {
  admin
    .firestore()
    .collection("exam")
    .orderBy("createdAt", "desc")
    .get()
    .then(data => {
      let exams = [];
      data.forEach(doc => {
        exams.push(doc.data());
      });
      return response.json(exams);
    })
    .catch(err => console.error(err));
});

app.post("/createExam", (request, response) => {
  const newExam = {
    quesions: [],
    createdAt: new Date().toISOString(),
    examName: request.body.examName
  };
  admin
    .firestore()
    .collection("exam")
    .add(newExam)
    .then(data => {
      return response.json({
        message: `Exam ${data.id} created successfully!`
      });
    })
    .catch(err => console.error(err));
});

exports.api = functions.https.onRequest(app);
