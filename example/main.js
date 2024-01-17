const { Database } = require('../dist/node-sqlite3-wasm.js');
const { mkdirSync, existsSync, rmSync } = require('fs');

function newDatabase(path, opts) {
  const db = new Database(path, opts);
  db.exec('PRAGMA key = 1234567812345678');
  return db;
}

function fill(db) {
  db.exec("CREATE TABLE IF NOT EXISTS names(name TEXT);");
  db.run("INSERT INTO names (name) VALUES (?)", ['Foo']);
  console.log(db.all("SELECT * FROM names"))
}

const dir = 'target';
const path = `${dir}/example.db`;
if (existsSync(path)) {
  //rmSync(path);
} else if (!existsSync(dir)) {
  mkdirSync(dir);
}

const db = newDatabase(path);
fill(db);
db.close();
