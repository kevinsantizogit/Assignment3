const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const bcrypt = require("bcrypt");

let db;

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

async function findUser(username, password) {
  const user = await db.get("SELECT * FROM Users WHERE username = ?", [username]);
  if (!user) return null;
  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;
  return user;
}

async function getAllUsers() {
  return await db.all("SELECT * FROM Users");
}

async function createUser(username, password) {
  const hashed = await bcrypt.hash(password, 10);
  await db.run("INSERT INTO Users VALUES (?,?,?)", [username, hashed, 'member']);
}

async function deleteUser(username) {
  await db.run("DELETE FROM Users WHERE username = ?", [username]);
}

module.exports = { findUser, getAllUsers, createUser, deleteUser };