const express = require('express');
const { register, login } = require('../controllers/authController');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();

router.post('/register', register);
router.post('/login' ,[isLoggedIn], login);
module.exports = router;
