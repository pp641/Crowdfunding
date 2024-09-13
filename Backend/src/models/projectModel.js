const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

  creator : {
    type : mongoose.Schema.ObjectId,
    ref : 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Project title is required'],
    minlength: [3, 'Project title must be at least 3 characters long'],
    maxlength: [100, 'Project title must be less than 100 characters'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    minlength: [10, 'Project description must be at least 10 characters long'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['tech', 'education', 'health', 'art', 'business'], 
  },
  targetAmount: {
    type: Number,
    required: [true, 'Target amount is required'],
    min: [1, 'Target amount must be greater than 0'],
  },
  fundedAmount: {
    type: Number,
    default: 0, 
    min: [0, 'Funded amount must be non-negative'],
  },
  deadline: {
    type: Date,
    validate: {
      validator: function (value) {
        return value > Date.now();
      },
      message: 'Deadline must be in the future',
    },
  },
  links: {
    type: [String], 
  },
  images: {
    type: [String], 
  },
  videos: {
    type: [String], 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

projectSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Project', projectSchema);
