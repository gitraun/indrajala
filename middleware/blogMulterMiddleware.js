const multer = require('multer');

// Configure multer storage and options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './blogs');  // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Use a unique filename
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept image files only
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Not an image! Please upload an image.'), false);
    } else {
      cb(null, true);
    }
  }
});

// Allow multer to handle a missing file by adding a condition to check for the presence of the file
const multerMiddleware = {
  single: field => (req, res, next) => {
    upload.single(field)(req, res, err => {
      // Don't throw on error if it's due to a missing file
      if (err && err.message !== 'File too large' && err.message !== 'Not an image! Please upload an image.') {
        return next(err);
      }
      next();
    });
  }
};

module.exports = multerMiddleware;
