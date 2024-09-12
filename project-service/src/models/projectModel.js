const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  targetAmount: {
    type: Number,
    required: true,
    min: [0, 'Target amount must be a positive number']
  },
  fundedAmount: {
    type: Number,
    default: 0,
    min: [0, 'Funded amount must be a positive number']
  },
  deadline: {
    type: Date,
    required: true
  },
  projectLink: {
    type: String,
    trim: true
  },
  images: [
    {
      type: String 
    }
  ],
  video: {
    type: String 
  }
}, {
    timestamps : true
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
