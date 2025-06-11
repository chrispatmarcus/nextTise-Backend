const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//@desc Register a user
//@route GET /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, phoneNum, password } = req.body;
  if (!username || !phoneNum || !password) {
    res.status(400);
    throw new Error("ALl fields are mandatory");
  }
  const userAvailable = await User.findOne({ phoneNum });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already registered");
  }
  // hash user password to store in database
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashed password:", hashedPassword);
  const user = await User.create({
    username,
    phoneNum,
    password: hashedPassword,
    // user_id: req.user.id,
  });
  console.log(`user created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, phoneNum: user.phoneNum });
  } else {
    res.status(400);
    throw new Error("user data is not valid");
  }
});

//@desc login user
//@route Post /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ username });

  if (!user) {
    res.status(400);
    throw new Error("user not registered");
  }
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "45m" }
    );
    // const accessToken = jwt.sign(
    //   {
    //     user: {
    //       username: user.username,
    //       phoneNum: user.phoneNum,
    //       id: user.id,
    //     },
    //   },
    //   process.env.ACCESS_TOKEN_SECRET,
    //   { expiresIn: "45m" }
    // );
    res.status(200).json({ accessToken });
  }
});

//@desc current user info
//@route Post /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
