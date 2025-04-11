const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add an event title"],
    },
    imagePath: {
      type: String, // Store file path
      required: [true, "Please upload an image"],
    },
    description: {
      type: String,
      required: [true, "Please add an event description"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);

// const mongoose = require("mongoose");
// const eventSchema = mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "please add event title"],
//     },
//     imgsrc: {
//       type: String,
//       required: [true, "please add an image source"],
//       unique: true,
//     },
//     description: {
//       type: String,
//       required: [true, "please add event description"],
//     },
//   },
//   {
//     Timestamps: true,
//   }
// );

// module.exports = mongoose.model("Event", eventSchema);
