const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

async function init() {
  try {
    db = await sqlite.open({
      filename: 'database.db',
      driver: sqlite3.Database
    });
  } catch(err) {
    console.error(err);
  }
}

init();

// Return all of the articles
async function getAllArticles() {
  return await db.all("SELECT * FROM Articles");
}

// Return all articles with their rowids (used on the editors page)
async function getAllArticlesWithId() {
  return await db.all("SELECT rowid, * FROM Articles");
}

// Create a new article given a title, content and username
async function createArticle(article, username) {
  await db.run("INSERT INTO Articles VALUES (?,?,?)",
         [article.title, username, article.content]);
}

async function deleteArticle(rowid) {
  await db.run("DELETE FROM Articles WHERE rowid = ?", [rowid]);
}


async function deleteArticlesByUser(username) {
  await db.run("DELETE FROM Articles WHERE username = ?", [username]);
}

module.exports = { getAllArticles
                 , getAllArticlesWithId
                 , createArticle
                 , deleteArticle
                 , deleteArticlesByUser };