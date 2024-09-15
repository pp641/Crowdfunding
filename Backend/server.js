const express = require('express');
const cors = require('cors');
const http = require('http');  // Use http to create the server
const { Server } = require('socket.io');
const connectDB = require('./src/config/db');

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const investmentRoutes = require('./src/routes/investmentRoutes');
const commentRoutes = require('./src/routes/commentRoutes');
const chatRoutes = require('./src/routes/chatRoutes');
const Chat = require('./src/models/ChatModel');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

connectDB();

app.use(authRoutes);
app.use( projectRoutes);
app.use( investmentRoutes);
app.use(commentRoutes);
app.use(chatRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('join', (data) => {
    console.log('User joined:', data);
    socket.join(data.userId); 
  });

  socket.on('sendMessage', async ({ sender, receiver, messageText }) => {
    console.log(`Message from ${sender} to ${receiver}: ${messageText}`);
    
    io.to(receiver).emit('receiveMessage', { sender, messageText });
    try {
        if (!sender || !receiver || !messageText) {
          return res.status(400).json({ message: 'Sender, receiver, and message text are required.' });
        }   
        const newMessage = new Chat({
          sender,
          receiver,
          messageText
        }); 
     const savedMessage = await newMessage.save();
      console.log('Message saved to database');
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
