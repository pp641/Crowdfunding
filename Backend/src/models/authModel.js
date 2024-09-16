const mongoose = require('mongoose');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [2, 'First name must be at least 2 characters'],
    maxlength: [50, 'First name must be less than 50 characters'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    minlength: [2, 'Last name must be at least 2 characters'],
    maxlength: [50, 'Last name must be less than 50 characters'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [emailRegex, 'Please fill a valid email address'], 
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  }
},{
  timestamps : true
});


module.exports = mongoose.model('User', userSchema);
