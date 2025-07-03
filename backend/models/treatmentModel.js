const db = require('./db'); // your sqlite db connection

class Treatment {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM treatments', (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  static create({ identifier, patientName, type, date, notes }) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO treatments (identifier, patientName, type, date, notes)
        VALUES (?, ?, ?, ?, ?)
      `;
      db.run(sql, [identifier, patientName, type, date, notes], function(err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, identifier, patientName, type, date, notes });
      });
    });
  }

  static deleteById(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM treatments WHERE id = ?', [id], function(err) {
        if (err) return reject(err);
        resolve(this.changes > 0);
      });
    });
  }

  // ADD THIS METHOD:
  static findByIdentifier(identifier) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM treatments WHERE identifier = ?', [identifier], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }
}

module.exports = Treatment;
