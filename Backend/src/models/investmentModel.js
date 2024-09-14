const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  investmentAmount: {
    type: Number,
    required: [true, 'Investment amount is required'],
    min: [0, 'Investment amount must be greater than 0'],
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',  
    required: [true, 'Project reference is required'],
  },
  investor: {    
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  
      required: true,
  },
  investedDate: {
    type: Date,
    default: Date.now,  
    required: true,
  },
});

module.exports = mongoose.model('Investment', investmentSchema);
