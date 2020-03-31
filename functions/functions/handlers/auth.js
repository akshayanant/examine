const { db, admin } = require("./../config/admin");

exports.fbAuth = (req, res, next) => {
  let tokenID;
  console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    tokenID = req.headers.authorization.split("Bearer ")[1];
  } else {
    return res.status(403).json({ error: "Authorization Failed" });
  }
  admin
    .auth()
    .verifyIdToken(tokenID)
    .then(decodedToken => {
      req.user = decodedToken;
      return db
        .collection("users")
        .where("uniqueID", "==", req.user.uid)
        .limit(1)
        .get();
    })
    .then(data => {
      req.user.email = data.docs[0].data().email;
      return next();
    })
    .catch(err => {
      res.json({ error: err });
    });
};
