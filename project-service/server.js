const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT || 5002;
console.log("JWT SECRETS", process.env)
// connectDB();
// app.use("/",authRoutes);
app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));
