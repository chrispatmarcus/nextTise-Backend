const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");

//@desc Register an admin
//@route GET /api/admin/register
//@access public
const registerAdmin = asyncHandler(async (req, res) => {
  const { username, phoneNum, password } = req.body;
  if (!username || !phoneNum || !password) {
    res.status(400);
    throw new Error("ALl fields are mandatory");
  }
  const adminAvailable = await Admin.findOne({ phoneNum });
  if (adminAvailable) {
    res.status(400);
    throw new Error("admin already registered");
  }
  // hash admin password to store in database
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashed password:", hashedPassword);
  const admin = await Admin.create({
    username,
    phoneNum,
    password: hashedPassword,
  });
  console.log(`admin created ${user}`);
  if (admin) {
    res.status(201).json({ _id: admin.id, phoneNum: admin.phoneNum });
  } else {
    res.status(400);
    throw new Error("admin data is not valid");
  }
});

//@desc login admin
//@route Post /api/admin/login
//@access public
const loginAdmin = asyncHandler(async (req, res) => {
  const { phoneNum, password } = req.body;
  if (!phoneNum || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const admin = await Admin.findOne({ phoneNum });
  if (!admin) {
    res.status(400);
    throw new Error("admin not registered");
  }
  //compare password with hashedpassword
  if (admin && (await bcrypt.compare(password, admin.password))) {
    const accessToken = jwt.sign(
      {
        admin: {
          username: admin.username,
          phoneNum: admin.phoneNum,
          id: admin.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "45m" }
    );
    res.status(200).json({ accessToken });
  }
});

//@desc current admin info
//@route Post /api/admin/current
//@access private
const currentAdmin = asyncHandler(async (req, res) => {
  res.json(req.admin);
});

module.exports = { registerAdmin, loginAdmin, currentAdmin };
