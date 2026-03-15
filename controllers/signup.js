const express = require('express');
var router = express.Router();
const UsersModel = require('../models/users.js');

router.get("/", async function(req, res) {
  req.TPL.signup_error = req.session.signup_error;
  req.session.signup_error = "";
  req.TPL.signup_success = req.session.signup_success;
  req.session.signup_success = "";
  res.render("signup", req.TPL);
});

router.post("/attemptcreate", async function(req, res) {
  const username = req.body.username || "";
  const password = req.body.password || "";

  if (username.length < 6 || password.length < 6) {
    req.session.signup_error = "Username/password cannot be less than 6 characters in length!";
    res.redirect("/signup");
  } else {
    await UsersModel.createUser(username, password);
    req.session.signup_success = "User account created!";
    res.redirect("/signup");
  }
});

module.exports = router;