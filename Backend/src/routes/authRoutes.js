const express = require('express');
const router = express.Router();
const { register, login , sendOtp , verifyOtp, getAllUsers } = require('../controllers/authController');

router.post('/register', register);
router.post('/login' , login);
router.post('/send-otp', sendOtp );
router.post('/verify-otp' , verifyOtp);
router.get('/users', getAllUsers)

module.exports = router;