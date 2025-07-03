// backend/models/db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/data.db');

db.serialize(() => {
  // 1a) Create table with UNIQUE(identifier)
  db.run(`
    CREATE TABLE IF NOT EXISTS treatments (
      id          INTEGER PRIMARY KEY,
      identifier  TEXT    NOT NULL UNIQUE,
      patientName TEXT    NOT NULL,
      type        TEXT    NOT NULL,
      date        TEXT    NOT NULL,
      notes       TEXT
    )
  `);

  // 1b) If your table existed before without UNIQUE,
  //      this will add the unique index now:
  db.run(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_treatments_identifier
      ON treatments(identifier)
  `);
});

module.exports = db;
