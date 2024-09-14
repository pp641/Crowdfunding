const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
  }
}, { timestamps: true });


module.exports = replySchema;