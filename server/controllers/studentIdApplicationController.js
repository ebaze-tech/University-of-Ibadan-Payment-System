const StudentIdApplicationModel = require('../models/studentIdApplicationModel');

class StudentIdApplicationController {
  static async apply(req, res) {
    const numberRegex = /^d{6}/;
    const {number, surname,otherNames, level, department, faculty, hostel} = req.body;
    // Validate input from request body
    if(!number || !surname || !otherNames|| !level || !department || !faculty || !hostel) {
      return res.status(400).json({
        message: 'Input cannot be empty'
      });
    }
    
    if (numberRegex.test(number)) {
      return res.status(400).json({
        message: 'Wrong number length. Must be 6 digits.'
      })
    }

    try {
      // Check if user already exists
      let user = await StudentIdApplicationModel.findByNumber(number);
      if(user){
        return res.status(400).json({
          message: 'User with this matriculation number already exists.'
        })
      };

      // Create new id card details
      const newStudentId = await StudentIdApplicationModel.create({
        number, surname, otherNames, level, department, faculty, hostel
      });

      res.status(201).json({
        newStudentId,
        message: 'ID Card application successful.'
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = StudentIdApplicationController;