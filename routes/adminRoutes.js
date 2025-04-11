const express = require("express");
// const { registerAdmin } = require("../controllers/adminController");
const {
  currentAdmin,
  loginAdmin,
  registerAdmin,
} = require("../controllers/adminControllers");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

router.get("/current", validateToken, currentAdmin);

module.exports = router;
