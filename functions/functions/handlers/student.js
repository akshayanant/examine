const { db, admin } = require("./../config/admin");

exports.availableexams = (req, res) => {
  db.collection("availableexams")
    .get()
    .then(data => {
      let exams = [];
      data.forEach(doc => {
        exams.push(doc.data());
      });
      return res.json(exams);
    })
    .catch(err => {
      console.error(err);
    });
};

exports.startexam = (req, res) => {
  let examID = req.body.examID;
  db.collection("availableexams")
    .where("examID", "==", examID)
    .limit(1)
    .get()
    .then(() => {
      return res.json({ message: "Exam Started Successfully" });
    })
    .catch(err => {
      res.json({ error: err });
    });
};

exports.submitexam = (req, res) => {
  const submission = {
    examID: req.body.examID,
    uid: req.user.uid,
    selection: []
  };
  db.collection("submissions")
    .add(submission)
    .then(data => {
      const subID = data.id;
      let uersRef = db.collection("users").doc(submission.uid);
      return uersRef
        .update({ submissions: admin.firestore.FieldValue.arrayUnion(subID) })
        .then(() => {
          return res.json({ message: `Submission ID ${subID}` });
        });
    })
    .catch(err => {
      res.json({ error: err });
    });
};
