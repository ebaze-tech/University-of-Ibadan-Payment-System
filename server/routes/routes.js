const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const StudentController = require('../controllers/studentController');
const StaffController = require('../controllers/staffController');
const StudentIdApplicationController = require('../controllers/studentIdApplicationController');
const StaffIdApplicationController = require('../controllers/staffIdApplicationController');
const ImageController = require('../controllers/imageController');
const PdfController = require('../controllers/pdfController');

// Image upload
router.post('/image-upload', ImageController.uploadImage);

// Document upload
router.post('document-upload', PdfController.uploadPDF)

// Admin registration route
router.post('/admin-registration', AdminController.register);

// Student registration route
router.post('/student-registration', StudentController.register);

// Staff registration route
router.post('/staff-registration', StaffController.register);

// Student login route
router.post('/student-login', StudentController.login);

// Staff login route
router.post('/staff-login', StaffController.login);

// Admin registration route
router.post('/admin-login', AdminController.login);

// Student ID Card application route
router.post('/apply-for-student-id', StudentIdApplicationController.apply);

// Staff ID Card application route
router.post('/apply-for-staff-id', StaffIdApplicationController.apply);

// Student ID card update route
// router.post('/update-student-id', StudentUpdateController.update);

// Staff ID card update route
// router.post('/update-staff-id', StaffUpdateController.update);

// Student ID card replacement route
// router.post('/replace-student-id', ReplaceStudentIdController.replace);

// Staff ID card replacement route
// router.post('/replace-staff-id', ReplaceStaffIdController.replace);

module.exports = router;