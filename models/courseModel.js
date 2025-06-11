const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    // user_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
    name: {
      type: String,
      required: [true, "Please add the course name"],
    },
    description: {
      type: String,
      required: [true, "Please add the course description"],
    },
    instructor: {
      type: String,
      required: [true, "Please add the instructor name"],
    },
    duration: {
      type: String,
      required: [true, "Please add the course duration"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
