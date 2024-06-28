const multer = require('multer');
const path = require('path');
const File = require('../models/fileModel');

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/images',
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload variable
const upload = multer({
  storage: storage,
  limits: {fileSize: 5000000 }, //5MB limit for images
  fileFilter: (req, file, callback) => {
    checkFileType(file,callback);
  }
}).single('image');

// Check file type
checkFileType = (file, callback) => {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return callback(null, true);
  } else {
    callback('Error: Images only!');
  }
}

exports.uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if(err) {
      res.status(400).json({
        message: err
      });
    } else {
      if(req.file === undefined) {
        res.status(400).json({
          message: 'No file selected!'
        });
      } else {
        const filePath = `/uploads/images/${req.file.filename}`;
        File.insert(filePath, () => {
          res.status(200).json({
            message: 'File uploaded.',
            file: req.file,
            filePath: filePath
          });
        });
      }
    }
  });
};