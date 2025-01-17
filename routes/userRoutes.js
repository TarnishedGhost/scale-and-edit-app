const express = require('express');
const { dashboard, editor, saveProcessedImage } = require('../controllers/userController');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.get('/dashboard', dashboard);
router.get('/editor', editor);
router.post('/save-processed-image', saveProcessedImage);

module.exports = router;
