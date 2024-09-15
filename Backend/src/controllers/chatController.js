const Chat = require('../models/ChatModel'); 
const User = require('../models/authModel'); 

const createMessage = async (req, res) => {
  try {
    const { sender, receiver, messageText } = req.body;

    if (!sender || !receiver || !messageText) {
      return res.status(400).json({ message: 'Sender, receiver, and message text are required.' });
    }

    const newMessage = new Chat({
      sender,
      receiver,
      messageText
    });

    const savedMessage = await newMessage.save();

    res.status(201).json({
      message: 'Message sent successfully.',
      data: savedMessage
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An error occurred while sending the message.',
      error: error.message,
    });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    if (!senderId || !receiverId) {
      return res.status(400).json({ message: 'Sender and receiver IDs are required.' });
    }

    const messages = await Chat.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ]
    })
    .populate('sender', 'firstName email')  
    .populate('receiver', 'firstName email') 
    .sort({ created_at: 1 });  

    if (!messages || messages.length === 0) {
      return res.status(200).json({ message: 'No messages found between these users.', data : [] });
    }

    res.status(200).json({
      message: 'Messages retrieved successfully.',
      data: messages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An error occurred while retrieving messages.',
      error: error.message,
    });
  }
};

module.exports = {
  createMessage,
  getAllMessages,
};
