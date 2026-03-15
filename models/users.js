const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

let db;
async function init() {
  db = await sqlite.open({ filename: 'database.db', driver: sqlite3.Database });
}
init();

async function findUser(username, password) {
  return await db.get(
    "SELECT * FROM Users WHERE username = ? AND password = ?",
    [username, password]
  );
}

async function getAllUsers() {
  return await db.all("SELECT * FROM Users");
}

async function createUser(username, password) {
  await db.run("INSERT INTO Users VALUES (?,?,?)", [username, password, 'member']);
}

async function deleteUser(username) {
  await db.run("DELETE FROM Users WHERE username = ?", [username]);
}

module.exports = { findUser, getAllUsers, createUser, deleteUser };