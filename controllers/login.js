const express = require('express');
var router = express.Router();
const UsersModel = require('../models/users.js');

// Displays the login page
router.get("/", async function(req, res) {
  req.TPL.login_error = req.session.login_error;
  req.session.login_error = "";
  res.render("login", req.TPL);
});

// Attempts to login a user
router.post("/attemptlogin", async function(req, res) {
  const user = await UsersModel.findUser(req.body.username, req.body.password);

  if (user) {
    req.session.username = user.username;
    req.session.level = user.level;

    if (user.level === 'editor') {
      res.redirect("/editors");
    } else {
      res.redirect("/members");
    }
  } else {
    req.session.login_error = "Invalid username and/or password!";
    res.redirect("/login");
  }
});

// Logout a user
router.get("/logout", async function(req, res) {
  delete(req.session.username);
  delete(req.session.level);
  res.redirect("/home");
});

module.exports = router;