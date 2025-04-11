const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please add the user name"],
    },
    phoneNum: {
      type: String,
      required: [true, "please add the contact email address"],
      unique: [true, "email address already taken"],
    },
    password: {
      type: String,
      required: [true, "please add the user password"],
    },
  },
  {
    Timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
