const { db, admin } = require("./../config/admin");

//exam handlers
exports.createExam = (request, response) => {
  const newExam = {
    quesions: [],
    createdAt: new Date().toISOString(),
    examName: request.body.examName
  };
  db.collection("exam")
    .add(newExam)
    .then(data => {
      return response.json({
        message: `Exam ${data.id} created successfully!`
      });
    })
    .catch(err => console.error(err));
};

exports.launchexam = (request, response) => {
  examID = request.body.examID;
  db.doc(`/availableexams/${examID}`)
    .set({ examID })
    .then(() => {
      response.json({ message: "Exam Launched Successfully" });
    })
    .catch(err => console.error(err));
};

exports.disableexam = (request, response) => {
  examID = request.body.examID;
  db.doc(`/availableexams/${examID}`)
    .delete()
    .then(() => {
      response.json({ message: "Exam Disbaled Successfully" });
    })
    .catch(err => console.error(err));
};

exports.getExams = (request, response) => {
  db.collection("exam")
    .orderBy("createdAt", "desc")
    .get()
    .then(data => {
      let exams = [];
      data.forEach(doc => {
        exam = {
          examID: doc.id,
          exam: doc.data()
        };
        exams.push(exam);
      });
      return response.json(exams);
    })
    .catch(err => console.error(err));
};

exports.activeExams = (req, res) => {
  db.collection("availableexams")
    .get()
    .then(data => {
      let active = [];
      data.forEach(doc => {
        active.push(doc.data().examID);
      });
      db.collection("exam")
        .get()
        .then(data => {
          let exams = [];
          data.forEach(doc => {
            if (active.includes(doc.id)) {
              exam = {
                examID: doc.id,
                exam: doc.data()
              };
              exams.push(exam);
            }
          });
          return res.json(exams);
        });
    })
    .catch(err => {
      console.error(err);
    });
};

//question handlers
exports.questions = (request, response) => {
  db.collection("questions")
    .orderBy("createdAt")
    .get()
    .then(data => {
      return data.docs;
    })
    .then(docs => {
      let questions = [];
      docs.forEach(doc => {
        questions.push(doc.data());
      });
      response.json(questions);
    })
    .catch(err => {
      response.json({ error: err });
    });
};

exports.addquestion = (request, response) => {
  console.log(request.body);
  const newQuestion = {
    question: request.body.question,
    createdAt: new Date().toISOString(),
    conclusion1: request.body.concl1,
    conclusion2: request.body.concl1,
    conclusion3: request.body.concl1,
    option1: request.body.option1,
    option2: request.body.option2,
    option3: request.body.option3,
    option4: request.body.option4,
    answer: request.body.answer,
    grade: request.body.grade
  };
  db.collection("questions")
    .add(newQuestion)
    .then(data => {
      return response.json({
        message: `Question ${data.id} created successfully!`
      });
    })
    .catch(err => console.error(err));
};

exports.appendquestion = (request, response) => {
  questionID = request.body.questionID;
  examID = request.body.examID;
  let examRef = db.collection("exam").doc(examID);
  examRef
    .update({ questions: admin.firestore.FieldValue.arrayUnion(questionID) })
    .then(() => {
      response.status(201).json({ message: "question added successfully" });
    })
    .catch(err => {
      response.json({ error: err });
    });
};

exports.removequestion = (request, response) => {
  questionID = request.body.questionID;
  examID = request.body.examID;
  let examRef = db.collection("exam").doc(examID);
  examRef
    .update({ questions: admin.firestore.FieldValue.arrayRemove(questionID) })
    .then(() => {
      response.status(201).json({ message: "question Removed successfully" });
    })
    .catch(err => {
      response.json({ error: err });
    });
};
