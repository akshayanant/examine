const { db, admin } = require("./../config/admin");

exports.availableexams = (req, res) => {
  db.collection("available_exams")
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

exports.allExams = (req, res) => {
  db.collection("all_exams")
    .get()
    .then(data => {
      let exams = [];
      data.forEach(doc => {
        exams.push({
          examID: doc.id,
          exam: doc.data()
        });
      });
      return res.json(exams);
    })
    .catch(err => {
      console.error(err);
    });
};

exports.pastExams = (req, res) => {
  db.collection("past_exams")
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
  const examID = req.body;
  db.collection("available_exams")
    .where("examID", "==", examID)
    .limit(1)
    .get()
    .then(() => {
      const submission = {
        examID: examID,
        uid: req.user.uid,
        selection: [],
        submitted: false
      };
      db.collection("submissions")
        .add(submission)
        .then(data => {
          const subID = data.id;
          let usersRef = db.collection("users").doc(submission.uid);
          usersRef
            .update({
              submissions: admin.firestore.FieldValue.arrayUnion(subID)
            })
            .then(() => {
              return res.json({ submissionID: subID });
            });
        });
    })
    .catch(err => {
      res.json({ error: err });
    });
};

exports.submitexam = (req, res) => {
  const submissionID = req.body.submissionID;
  let subRef = db.collection("submissions").doc(submissionID);
  return subRef
    .update({
      submitted: true
    })
    .then(() => {
      return res.json({ message: `Submission ID ${submissionID}` });
    });
};
