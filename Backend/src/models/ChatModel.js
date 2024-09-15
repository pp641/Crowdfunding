const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    messageText: {
      type: String,
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    }
  },
  {
    timestamps: true,  
  }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
