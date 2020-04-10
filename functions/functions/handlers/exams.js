const { db, admin } = require("./../config/admin");

//exam handlers
exports.createExam = (req, res) => {
  const newExam = {
    questions: [],
    createdAt: new Date().toISOString(),
    examName: req.body.examName,
    attempts: 1,
    duration: 15,
    points: 0,
  };
  db.collection("all_exams")
    .add(newExam)
    .then((data) => {
      return res.json({
        message: `Exam ${data.id} created successfully!`,
      });
    })
    .catch((err) => {
      return res.json({ error: err });
    });
};

exports.launchexam = (req, res) => {
  const examID = req.body.examID;
  const duration = req.body.duration;
  exam = {
    examID: examID,
    duration: duration,
  };
  db.doc(`/available_exams/${examID}`)
    .set(exam)
    .then(() => {
      db.doc(`/past_exams/${examID}`)
        .delete()
        .then(() => {
          res.json({ message: "Exam Launched Successfully" });
        });
    })
    .catch((err) => {
      return res.json({ error: err });
    });
};

exports.disableexam = (req, res) => {
  examID = req.body.examID;
  db.doc(`/available_exams/${examID}`)
    .delete()
    .then(() => {
      db.doc(`/past_exams/${examID}`)
        .set({ examID })
        .then(() => {
          res.json({ message: "Exam Disbaled Successfully" });
        });
    })
    .catch((err) => {
      return res.json({ error: err });
    });
};

exports.getExams = (req, res) => {
  db.collection("all_exams")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let exams = [];
      data.forEach((doc) => {
        exam = {
          examID: doc.id,
          exam: doc.data(),
        };
        exams.push(exam);
      });
      return res.json(exams);
    })
    .catch((err) => {
      return res.json({ error: err });
    });
};

exports.activeExams = (req, res) => {
  db.collection("available_exams")
    .get()
    .then((data) => {
      let active = [];
      data.forEach((doc) => {
        active.push(doc.data().examID);
      });
      db.collection("all_exams")
        .get()
        .then((data) => {
          let exams = [];
          data.forEach((doc) => {
            if (active.includes(doc.id)) {
              exam = {
                examID: doc.id,
                exam: doc.data(),
              };
              exams.push(exam);
            }
          });
          return res.json(exams);
        });
    })
    .catch((err) => {
      return res.json({ error: err });
    });
};

exports.getExamDetails = (req, res) => {
  const examID = req.params.examID;
  db.doc(`/all_exams/${examID}`)
    .get()
    .then((data) => {
      res.json({ exam: data.data() });
    })
    .catch((err) => {
      res.json({ error: err });
    });
};

//question handlers
exports.questions = (req, res) => {
  db.collection("questions")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      return data.docs;
    })
    .then((docs) => {
      let questions = [];
      docs.forEach((doc) => {
        questions.push(doc.data());
      });
      res.json(questions);
    })
    .catch((err) => {
      res.json({ error: err });
    });
};

exports.getQuestionIDs = (req, res) => {
  db.collection("questions")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      return data.docs;
    })
    .then((docs) => {
      let questions = [];
      docs.forEach((doc) => {
        questions.push(doc.id);
      });
      res.json(questions);
    })
    .catch((err) => {
      res.json({ error: err });
    });
};

exports.addquestion = (req, res) => {
  const newQuestion = {
    question: req.body.question,
    createdAt: new Date().toISOString(),
    conclusion1: req.body.concl1,
    conclusion2: req.body.concl2,
    conclusion3: req.body.concl3,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    footer: req.body.footer,
    answer: req.body.answer,
    grade: req.body.grade,
  };
  db.collection("questions")
    .add(newQuestion)
    .then((data) => {
      return res.json({
        message: `Question ${data.id} created successfully!`,
      });
    })
    .catch((err) => {
      return res.json({ error: err });
    });
};

exports.appendquestion = (req, res) => {
  questionID = req.body.questionID;
  examID = req.body.examID;
  let examRef = db.collection("all_exams").doc(examID);
  examRef
    .update({ questions: admin.firestore.FieldValue.arrayUnion(questionID) })
    .then(() => {
      res.status(201).json({ message: "question added successfully" });
    })
    .catch((err) => {
      res.json({ error: err });
    });
};

exports.removequestion = (req, res) => {
  questionID = req.body.questionID;
  examID = req.body.examID;
  let examRef = db.collection("all_exams").doc(examID);
  examRef
    .update({ questions: admin.firestore.FieldValue.arrayRemove(questionID) })
    .then(() => {
      res.status(201).json({ message: "question Removed successfully" });
    })
    .catch((err) => {
      res.json({ error: err });
    });
};

exports.getQuestionDetails = (req, res) => {
  const questionID = req.params.questionID;
  db.doc(`/questions/${questionID}`)
    .get()
    .then((data) => {
      res.json({ question: data.data() });
    })
    .catch((err) => {
      res.json({ error: err });
    });
};
