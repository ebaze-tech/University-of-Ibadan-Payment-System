const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const AuthController = require('../controllers/authController');
const StudentIdApplicationController = require('../controllers/studentIdApplicationController')
const StaffIdApplicationController = require('../controllers/staffIdApplicationController');
const StudentUpdateController = require('../controllers/studentUpdateController');
const StaffUpdateController = require('../controllers/staffUpdateController');
const ReplaceStudentIdController = require('../controllers/replaceStudentIdController');
const ReplaceStaffIdController = require('../controllers/replaceStaffIdController')
const AdminController = require('../controllers/adminController');
// Register route
router.post('/register', UserController.register);

// Login route
router.post('/login', AuthController.login);

// Logout route
router.post('/logout', AuthController.logout);

// Student ID Card application route
router.post('/apply-for-student-id', StudentIdApplicationController.apply);

// Staff ID Card application route
router.post('/apply-for-staff-id', StaffIdApplicationController.apply);

// Student ID card update route
router.post('/update-student-id', StudentUpdateController.update);

// Staff ID card update route
router.post('/update-staff-id', StaffUpdateController.update);

// Student ID card replacement route
router.post('/replace-student-id', ReplaceStudentIdController.replace);

// Staff ID card replacement route
router.post('/replace-staff-id', ReplaceStaffIdController.replace);

// Admin registration route
router.post('/admin-register', AdminController.register);
module.exports = router;