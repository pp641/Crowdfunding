const bcrypt = require("bcryptjs");
const User = require("../models/authModel");
const sendEmail = require('../services/mailer');
const { generateToken } = require("../services/jwtService");
const mongoose  = require("mongoose");

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
  console.log("checking")
  const { email, password } = req.body.data; 
  console.log("oktest", req.body)
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("usepass ", user)
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    console.log("value" , isPasswordValid)
    if (!isPasswordValid) {
      console.log("tst new")
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = await generateToken(user);
    res.json({ token : token , id : user._id , email  : user.email });
  } catch (error) {
    res.status(500).json({ message: error });
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

  exports.updatePassword = async (req,res)=> {
    try {
    const { email, newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findOne({ email });
    user.passwordHash = hashedPassword;
    await user.save().then((obj)=>{
      console.log("okay", obj)
    }).catch(error =>{
      console.log("Error", error);
    })
    if (user) {
      res.status(200).json({ message: user});
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
    console.log("NEWUSER", user);
  } catch(error){
    console.log("Error", error);
  }
  }

 
  const getUserProfile = async (req, res) => {
    try {
      const currentUser = await User.findOne({ _id: req.params.userId }).select('-passwordHash');
      if (currentUser) {
        res.status(200).json(currentUser);
      } else {
        res.status(404).json({ message: 'User not found.' });
      }
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: 'Server error.' });
    }
  };
  

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
  



exports.getUserDetails = async (req, res) => {
  try {
    console.log("params" , req.params)
    const { id } = req.params; 
    const userId = id;  
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const userDetails = await User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) } 
      },
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
          createdProjects: 1,
          investments: 1,
          projectsCreatedCount: 1,
          investmentsCount: 1
        }
      }
    ]);

    if (userDetails.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log("USer details " , userDetails);

    res.json({ user: userDetails[0] });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Error fetching user details', error });
  }
};
