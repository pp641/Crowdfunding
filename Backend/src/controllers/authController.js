const bcrypt = require("bcryptjs");
const User = require("../models/authModel");
const sendEmail = require('../services/mailer');
const { generateToken } = require("../services/jwtService");

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body.data;
  console.log("data", req.body)
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
  const { email, password } = req.body.data; 
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(user);
    res.json({ token : token , id : user._id , email  : user.email });
  } catch (error) {
    res.status(500).json({ message: error.inspect });
  }
};


exports.sendOtp =  async (req, res) => {
    const { email } = req.body;
    try {
      console.log("body", req.body)
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


  exports.getAllUsers = async (req, res) => {
    try {
      const usersList = await User.aggregate([
        {
          $lookup: {
            from: 'projects', 
            localField: '_id',
            foreignField: 'creator', 
            as: 'createdProjects',
          }
        },
        {
          $lookup: {
            from: 'investments', 
            localField: '_id',
            foreignField: 'investor', 
            as: 'investments',
          }
        },
        {
          $addFields: {
            projectsCreatedCount: { $size: '$createdProjects' },
            investmentsCount: { $size: '$investments' }
          }
        },
        {
          $project: {
            name: 1,
            email: 1,
            projectsCreatedCount: 1,
            investmentsCount: 1
          }
        }
      ]);
  
      res.json({ users: usersList });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error fetching users', error });
    }
  };
  
