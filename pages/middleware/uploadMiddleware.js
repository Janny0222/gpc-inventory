import multer from 'multer';

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Specify upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
 
  },
});


const upload = multer({ storage: storage });
const uploadMiddleware = upload.single('file');
// Middleware to handle file upload

export default uploadMiddleware;