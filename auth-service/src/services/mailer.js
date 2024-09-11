const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config();
const redisClient = require('../config/redisClient');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  host: "smtp.gmail.com",
  port: 587,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail = async (to, subject, text) => {
  return await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  });
};


exports.generateAndSendOtp = async (email) => {
    const otp = Math.round(Math.random(0,1)*1000000).toString();
    await redisClient.setEx(`otp:${email}`, 15 * 60, otp);
    const subject = 'Your OTP Code';
    const text = `Your OTP code is ${otp}`;
    await sendEmail(email, subject, text);
  };
  

 exports.verifyOtp = async (email, otp) => {
    const storedOtp = await redisClient.get(`otp:${email}`);
    if (!storedOtp) {
      throw new Error('OTP has expired or is invalid');
    }
    if (storedOtp !== otp) {
      throw new Error('Invalid OTP');
    }
    await redisClient.del(`otp:${email}`);
    return 'Email verified successfully';
  };
  
