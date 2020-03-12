const { db, admin } = require("./../config/admin");

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
  duration = request.body.duration;
  db.doc(`/availableexams/${examID}`)
    .set({ examID, duration })
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
        exams.push(doc.data());
      });
      return response.json(exams);
    })
    .catch(err => console.error(err));
};

exports.addquestion = (request, response) => {
  const newQuestion = {
    question: request.body.question,
    createdAt: new Date().toISOString(),
    conclusions: [],
    options: [],
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
