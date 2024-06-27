const StaffIdApplicationModel = require('../models/staffsIdApplicationModel')

class StaffIdApplicationController {
  static async apply(req, res) {
    const numberRegex = /^d{4,5}/;
    const {number, surname,otherNames, position, department, faculty} = req.body;
    // Validate input from request body
    if(!number || !surname || !otherNames|| !position || !department || !faculty) {
      return res.status(400).json({
        message: 'Input cannot be empty'
      });
    }

    if (numberRegex.test(number)) {
      return res.status(400).json({
        message: 'Wrong number length. Must be 4 or 5 digits.'
      })
    }

    try {
      // Check if user already exists
      let user = await StaffIdApplicationModel.findByNumber(number);
      if(user){
        return res.status(400).json({
          message: 'User with this matriculation number already exists.'
        })
      };

      // Create new id card details
      const newStaffId = await StaffIdApplicationModel.create({
        number, surname, otherNames, position, department, faculty
      });

      res.status(201).json({
        newStaffId,
        message: 'ID Card application successful.'
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = StaffIdApplicationController;