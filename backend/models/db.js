const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/data.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS treatments (
      id          INTEGER PRIMARY KEY,
      identifier  TEXT    NOT NULL,
      patientName TEXT    NOT NULL,
      type        TEXT    NOT NULL,
      date        TEXT    NOT NULL,
      notes       TEXT
    )
  `);

});

module.exports = db;