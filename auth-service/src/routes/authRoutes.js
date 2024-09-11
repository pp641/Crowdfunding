const express = require('express');
const { register, login , sendOtp , verifyOtp } = require('../controllers/authController');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();

router.post('/register', register);
router.post('/login' ,[isLoggedIn], login);
router.post('/send-otp', sendOtp );
router.post('/verify-otp' , verifyOtp);
module.exports = router;