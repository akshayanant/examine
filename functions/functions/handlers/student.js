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
      const answers = submission.answers;
      db.doc(`/all_exams/${submission.examID.examID}`)
        .get()
        .then((doc) => {
          const exam = doc.data();
          const negative = exam.negative;
          let points = 0.0;
          let grading = [];
          const size = exam.questions.length;
          let i = 1;
          exam.questions.forEach((questionID) => {
            const match = answers.filter(
              (answer) => answer.questionID == questionID
            );
            let userSelection = -1;
            if (match.length > 0) {
              userSelection = match[0].selection;
            }
            db.doc(`/questions/${questionID}`)
              .get()
              .then((doc) => {
                const question = doc.data();
                const correctAnswer = question.answer;
                let point = 0.0;
                if (userSelection == correctAnswer) {
                  //point = question.point;
                  point = 1;
                } else if (userSelection != -1) {
                  point = negative;
                }
                const check = {
                  questionID: questionID,
                  correctAnswer: correctAnswer,
                  userSelection: userSelection,
                  point: point,
                };
                console.log(check);
                grading.push(check);
                points += point;
                if (i == size) {
                  const result = {
                    submissionID: submissionID,
                    grading: grading,
                    points: points,
                    examName: exam.examName,
                  };
                  console.log(result);
                  db.collection("grades")
                    .add(result)
                    .then((data) => {
                      db.collection("submissions")
                        .doc(submissionID)
                        .update({ resultID: data.id })
                        .then(() => {
                          return res.json({ message: "graded successfully!" });
                        });
                    });
                }
                i++;
              });
          });
        });
    });
};

exports.getGrades = (req, res) => {
  const submissionID = req.params.submissionID;
  console.log(submissionID);
  db.collection("grades")
    .where("submissionID", "==", submissionID)
    .get()
    .then((data) => {
      return res.json(data.docs[0].data());
    })
    .catch((err) => {
      console.log(err);
    });
};
