const mongoose = require("mongoose");
const adminSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please add the admin name"],
    },
    phoneNum: {
      type: String,
      required: [true, "please add the admin phone number"],
      unique: [true, "phone number already taken"],
    },
    password: {
      type: String,
      required: [true, "please add the admin password"],
    },
  },
  {
    Timestamps: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema);
