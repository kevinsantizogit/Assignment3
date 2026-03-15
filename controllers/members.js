const express = require('express');
var router = express.Router();
const ArticlesModel = require('../models/articles.js');

// Display the members page
router.get("/", async function(req, res) {
  res.render("members", req.TPL);
});

// Create an article using the logged-in user's username
router.post("/create", async function(req, res) {
  await ArticlesModel.createArticle(req.body, req.session.username);
  req.TPL.message = "Article successfully created!";
  res.render("members", req.TPL);
});

module.exports = router;