const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please add the user name"],
      unique: true,
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
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

