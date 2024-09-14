const mongoose = require('mongoose');
const replySchema = require('./replyModel')
const commentSchema = new mongoose.Schema({
  project:{ 
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Project',
    required : true
  },
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
  },
  replies: [replySchema]
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
