const bcrypt = require("bcryptjs");
const User = require("../models/authModel");
const crypto = require('crypto');
const sendEmail = require('../services/mailer');
const redisClient = require('../config/redisClient');
const { generateToken } = require("../services/jwtService");

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      passwordHash: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message : 'Account Created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.sendOtp =  async (req, res) => {
    const { email } = req.body;
    try {
      await sendEmail.generateAndSendOtp(email);
      res.status(200).send('OTP sent to email');
    } catch (error) {
      res.status(500).send({"msg" : error.message});
    }
  }
  

  exports.verifyOtp =  async (req, res) => {
    const { email, otp } = req.body;
    try {
      const message = await sendEmail.verifyOtp(email, otp);
      res.status(200).send(message);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }



