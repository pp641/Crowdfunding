const express = require('express');
const { createMessage, getAllMessages } = require('../controllers/chatController');
const router = express.Router();
router.post('/message/new', createMessage);
router.get('/messages/:senderId/:receiverId', getAllMessages);
module.exports = router;
