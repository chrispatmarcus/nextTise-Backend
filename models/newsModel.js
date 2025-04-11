const mongoose = require("mongoose");

const newsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a news title"],
    },
    imagePath: {
      type: String, // Store file path
      required: [true, "Please upload an image"],
    },
    description: {
      type: String,
      required: [true, "Please add a news description"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("News", newsSchema);

// const mongoose = require("mongoose");
// const newsSchema = mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "please add news title"],
//     },
//     imgsrc: {
//       type: String,
//       required: [true, "please add an image source"],
//       unique: true,
//     },
//     description: {
//       type: String,
//       required: [true, "please add news description"],
//     },
//   },
//   {
//     Timestamps: true,
//   }
// );

// module.exports = mongoose.model("News", newsSchema);
