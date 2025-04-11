const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/events/"); // Store in uploads/events folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// File validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, JPG allowed."), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;