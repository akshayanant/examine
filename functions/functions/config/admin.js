const admin = require("firebase-admin");
const firebase = require("firebase");
const { firebaseConfig } = require("./config");
const express = require("express");

const app = express();
admin.initializeApp();
firebase.initializeApp(firebaseConfig);
const db = admin.firestore();

module.exports = { firebase, db, app, admin };
