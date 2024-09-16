const express = require('express');
const router = express.Router();
const { register, login , sendOtp , verifyOtp, getAllUsers, updatePassword, getUserDetails } = require('../controllers/authController');

router.post('/register', register);
router.get('/profile/:id', getUserDetails);
router.post('/login' , login);
router.post('/send-otp', sendOtp );
router.post('/verify-otp' , verifyOtp);
router.get('/users', getAllUsers)
router.put('/update-password',updatePassword);


module.exports = router;