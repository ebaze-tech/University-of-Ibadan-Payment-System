const db = require('../config/db');

class StudentApply {
  static async create ({
    number, surname, otherNames, level, department, faculty, hall
  }) {
    // Validate input from request body
    if(!number || !surname || !otherNames || !level || !department || !faculty || !hall){
      throw new Error('Input cannot be empty.')
    }
    
    try {
      const connection = await db.getConnection();
      const [rows] = await connection.execute(
        'INSERT INTO studentIdApplication (number, surname, other_names, level, department, faculty, hall) VALUE (?,?,?,?,?,?)',
        [number, surname, otherNames, level, department, faculty, hall]
      );
      return rows.insertId;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      if(connection){
        connection.release();
      }
    }
  }

  static async findByNumber(number){
    if(!number){
      throw new Error('Number is required to find user.');
    }
    try {
      const connection = await db.getConnection();
      const [rows] = await connection.execute(
        'SELECT * FROM studentIdApplication WHERE number = ?',
        [number]
      );
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw new Error(error.message);
    } finally{
      if(connection){
        connection.release();
      }
    }
  }
}

  // static async findByName(surname, otherNames){
  //   if(!surname || !otherNames){
  //     throw new Error('Name is required to find user.');
  //   }
  //   try {
  //     const connection = await db.getConnection();
  //     const [rows] = await connection.execute(
  //       'INSERT INTO studentIdApplication WHERE name = ?',
  //       [name]
  //     );
  //     return rows.length > 0 ? rows[0] : null;
  //   } catch (error) {
  //     throw new Error(error.message);
  //   } finally{
  //     if(connection){
  //       connection.release();
  //     }
  //   }
  // }

module.exports = StudentApply;