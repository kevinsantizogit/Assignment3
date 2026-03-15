const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
var db = new sqlite3.Database("database.db");

async function init() {
  const mem1hash   = await bcrypt.hash('mem1', 10);
  const mem2hash   = await bcrypt.hash('mem2', 10);
  const edit1hash  = await bcrypt.hash('edit1', 10);
  const edit2hash  = await bcrypt.hash('edit2', 10);

  db.serialize(function() {
    db.run("DROP TABLE IF EXISTS Users");
    db.run("CREATE TABLE Users (username TEXT, password TEXT, level TEXT)");
    db.run("INSERT INTO Users VALUES (?,?,?)", ['mem1',  mem1hash,  'member']);
    db.run("INSERT INTO Users VALUES (?,?,?)", ['mem2',  mem2hash,  'member']);
    db.run("INSERT INTO Users VALUES (?,?,?)", ['edit1', edit1hash, 'editor']);
    db.run("INSERT INTO Users VALUES (?,?,?)", ['edit2', edit2hash, 'editor']);

    db.run("DROP TABLE IF EXISTS Articles");
    db.run("CREATE TABLE Articles (title TEXT, username TEXT, content TEXT)");
    db.run("INSERT INTO Articles VALUES (?,?,?)",
            ["My favourite places to eat",
             "mem1",
              "<p>My favourite places to eat are The Keg, Boston Pizza and" +
              "   McDonalds</p><p>What are your favourite places to eat?</p>"]);
    db.run("INSERT INTO Articles VALUES (?,?,?)",
            ["Tips for NodeJS",
             "mem2",
              "<p>The trick to understanding NodeJS is figuring out how " +
              "async I/O works.</p> <p>Callback functions are also very " +
              "important!</p>"]);
    db.run("INSERT INTO Articles VALUES (?,?,?)",
            ["Ontario's top hotels",
             "edit1",
              "<p>The best hotel in Ontario is the Motel 8 on highway 234</p>" +
              "<p>The next best hotel is The Sheraton off main street.</p>"]);
  });
}

init();