//Auth router
const express = require('express');
const { register, login, logout, getAboutPage } = require('../controllers/authController');
const router = express.Router();

router.get('/register', (req, res) => res.render('register', {'title': 'Register'}));
router.post('/register', register);
router.get('/login', (req, res) => res.render('login', {'title': 'Login'}));
router.post('/login', login);
router.get('/logout', logout);
router.get('/about', getAboutPage);

module.exports = router;
