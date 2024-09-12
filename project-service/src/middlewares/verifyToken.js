const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.token
  console.log("here token", token)
  if (!token) return res.status(401).json({ message: 'Token is missing' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = { verifyToken };
