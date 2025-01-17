// const express = require('express');
// const { uploadImage, processImage } = require('../controllers/imageController');
// const router = express.Router();

// router.get('/upload', (req, res) => res.render('editor'));
// router.post('/upload', uploadImage, processImage);

// module.exports = router;

const express = require('express');
const multer = require('multer');
const path = require('path');
const imageController = require('../controllers/imageController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// router.post('/upload', imageController.uploadImage);
// router.post('/process', upload.single('image'), imageController.processImage);
router.post('/upload', upload.single('imageFile'), imageController.uploadImage);
router.post('/process', imageController.processImage);
// router.post('/upload', (req, res, next) => {
    // console.log('Route hit: /image/upload');
    // next();
// }, upload.single('imageFile'), imageController.uploadImage);
module.exports = router;

