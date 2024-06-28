const multer = require('multer');
const path = require('path');
const File = require('../models/fileModel');

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/pdfs',
  filename: (req, file, callback) => {
    callback(null, file.filename + '-' + Date.now() + path.extname(file.originalname));
  }
}).single('pdf');

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /pdf/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
      return cb(null, true);
  } else {
      cb('Error: PDFs only!');
  }
}

exports.uploadPDF = (req, res) => {
  upload(req, res, (err) => {
      if (err) {
          res.status(400).json({ message: err });
      } else {
          if (req.file == undefined) {
              res.status(400).json({ message: 'No PDF selected!' });
          } else {
              const filePath = `/uploads/pdfs/${req.file.filename}`;
              File.insert(filePath, (result) => {
                  res.status(200).json({
                      message: 'PDF uploaded!',
                      file: req.file,
                      filePath: filePath
                  });
              });
          }
      }
  });
};