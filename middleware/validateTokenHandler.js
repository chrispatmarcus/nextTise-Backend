const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Token is missing");
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // IMPORTANT: make sure your token payload contains id directly or adjust accordingly
    req.user = decoded;

    console.log("Decoded payload:", decoded); // Debugging
    next();
  } catch (err) {
    res.status(401);
    throw new Error("User is not authorized");
  }
});

module.exports = validateToken;
