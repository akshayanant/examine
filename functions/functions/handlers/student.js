const { db, admin } = require("./../config/admin");

exports.availableexams = (req, res) => {
  db.collection("available_exams")
    .get()
    .then((data) => {
      let exams = [];
      data.forEach((doc) => {
        exams.push(doc.data());
      });
      return res.json(exams);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.allExams = (req, res) => {
  db.collection("all_exams")
    .get()
    .then((data) => {
      let exams = [];
      data.forEach((doc) => {
        exams.push({
          examID: doc.id,
          exam: doc.data(),
        });
      });
      return res.json(exams);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.pastExams = (req, res) => {
  db.collection("past_exams")
    .get()
    .then((data) => {
      let exams = [];
      data.forEach((doc) => {
        exams.push(doc.data());
      });
      return res.json(exams);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.startexam = (req, res) => {
  const examID = req.body;
  db.collection("available_exams")
    .where("examID", "==", examID)
    .limit(1)
    .get()
    .then(() => {
      const submission = {
        examID: examID,
        uid: req.user.uid,
        answers: [],
        submitted: false,
      };
      db.collection("submissions")
        .add(submission)
        .then((data) => {
          const subID = data.id;
          let usersRef = db.collection("users").doc(submission.uid);
          usersRef
            .update({
              submissions: admin.firestore.FieldValue.arrayUnion(subID),
            })
            .then(() => {
              return res.json({ submissionID: subID });
            });
        });
    })
    .catch((err) => {
      res.json({ error: err });
    });
};

exports.submitexam = (req, res) => {
  const submissionID = req.body.submissionID;
  const answers = req.body.answers;
  let subRef = db.collection("submissions").doc(submissionID);
  return subRef
    .update({
      answers: answers,
      submitted: true,
    })
    .then(() => {
      return res.json({ message: `Submission ID ${submissionID}` });
    });
};

exports.gradeSubmission = (req, res) => {
  const submissionID = req.body.submissionID;
  db.doc(`/submissions/${submissionID}`)
    .get()
    .then((doc) => {
      const submission = doc.data();
      console.log(submissionID);
      db.doc(`/all_exams/${submission.examID.examID}`)
        .get()
        .then((doc) => {
          const exam = doc.data();
          const negative = exam.negative;
          let points = 0.0;
          let grading = [];
          const size = submission.answers.length;
          let i = 1;
          submission.answers.forEach((answer) => {
            const questionID = answer.questionID;
            const userSelection = answer.selection;
            db.doc(`/questions/${questionID}`)
              .get()
              .then((doc) => {
                const question = doc.data();
                const correctAnswer = question.answer;
                let point = 0.0;
                if (userSelection === correctAnswer) {
                  point = question.point;
                } else {
                  point = negative;
                }
                grading.push({
                  questionID: questionID,
                  correctAnswer: correctAnswer,
                  userSelection: userSelection,
                  point: point,
                });
                points += point;
                if (i == size) {
                  const result = {
                    submissionID: submissionID,
                    grading: grading,
                    points: points,
                  };
                  db.collection("grades")
                    .add(result)
                    .then((data) => {
                      db.collection("submissions")
                        .doc(submissionID)
                        .update({ resultID: data.id })
                        .then(() => {
                          res.json({ message: "graded successfully!" });
                        });
                    });
                }
                i++;
              });
          });
        });
    });
};
