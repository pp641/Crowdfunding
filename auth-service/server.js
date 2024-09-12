const express = require('express');
const app = express();
app.use(express.json());
const authRoutes = require('./src/routes/authRoutes');
const connectDB = require('./src/config/db');
const PORT = process.env.PORT || 5001;
connectDB();
app.use("/",authRoutes);
app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));
