const db = require('../config/db');

const File = {
  insert: (filePath, callback) => {
    const sql = 'INSERT INTO files (file_path) VALUES (?)';
    db.query(sql, [filePath], (error, result) => {
      if(err) throw error;
      callback(result);
    });
  }
};

module.exports = File;