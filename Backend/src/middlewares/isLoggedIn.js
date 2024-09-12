const jwt = require("jsonwebtoken");
const  verifyToken = require("../services/jwtService").verifyToken;

const isLoggedIn = async (req, res, next) => {
    
  const token = req.headers["authorization"].split(" ")[1];
  console.log("token", token)
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, please log in." });
  }
  try {
    
    const verifiedToken= await verifyToken(token);
    req.user = verifiedToken;
    console.log("okfind", verifiedToken )
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token has expired. Please log in again." });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token. Please log in." });
    }
    return res.status(401).json({ message: "Failed to authenticate token." });
  }
};

module.exports = isLoggedIn;
