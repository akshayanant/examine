const { firebase, db } = require("./../config/admin");

exports.signup = (request, response) => {
  let tokenID, userID;
  console.log(request.body);
  const newUser = request.body;
  if (newUser.firstName.length < 3) {
    return response.status(400).json({
      error: "First Name must be atleast three characters"
    });
  }
  if (newUser.lastName.length < 3) {
    return response.status(400).json({
      error: "Last Name must be atleast three characters"
    });
  }
  if (newUser.email.length < 3) {
    return response.status(400).json({ error: "Invalid Email" });
  }
  if (newUser.password.length < 6) {
    return response.status(400).json({ error: "Password too short" });
  }
  if (newUser.password != newUser.confirmPassword) {
    return response.status(400).json({ error: "Passwords don't match" });
  }
  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(data => {
      userID = data.user.uid;
      return data.user.getIdToken();
    })
    .then(token => {
      tokenID = token;
      const createdUser = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        uniqueID: userID,
        submissions: []
      };
      return db.doc(`/users/${createdUser.uniqueID}`).set(createdUser);
    })
    .then(() => {
      return response.json({ tokenID: `${tokenID}` });
    })
    .catch(err => {
      return response.status(500).json({ error: err.message });
    });
};

exports.signin = (request, response) => {
  let tokenID;
  const user = request.body;
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return response.json({ tokenID: `${token}` });
    })
    .catch(err => {
      return response.status(500).json({ error: err.message });
    });
};

exports.signout = (request, response) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      response.json({ message: "logout successfull!" });
    });
};
