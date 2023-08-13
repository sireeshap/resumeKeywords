const multer = require('multer');
const fs = require('fs');
const path = require('path');
// Configure multer storage and file name
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  // Create multer upload instance
  const upload = multer({ storage: storage });
  
  // Custom file upload middleware
  const uploadFiles = (req, res, next) => {
    // Use multer upload instance
    upload.array('files', 5)(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
       // Retrieve uploaded files
    const files = req.files;
    const errors = [];

    // Validate file types and sizes
    files.forEach((file) => {
      const allowedTypes = ['application/docx', 'application/pdf','application/doc'];
      const maxSize = 10 * 1024 * 1024; // 5MB
      if (!allowedTypes.includes(file.mimetype)) {
        errors.push(`Invalid file type: ${file.originalname}`);
      }
      else{
        file['type']=file.mimetype.split('/')[1];
      }

      if (file.size > maxSize) {
        errors.push(`File too large: ${file.originalname}`);
      }
    });

    // Handle validation errors
    if (errors.length > 0) {
      // Remove uploaded files
      files.forEach((file) => {
        fs.unlinkSync(file.path);
      });

      return res.status(400).json({ errors });
    }

    // Attach files to the request object
    req.files = files;

    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = uploadFiles;