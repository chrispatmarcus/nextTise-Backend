const mongoose = require("mongoose");

const sermonSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a sermon title"],
    },
    text: {
      type: String,
      required: [true, "Please add sermon text"],
    },
    preacher: {
      type: String,
      required: [true, "Please add preacher name"],
    },
    documentPath: {
      type: String, // Stores document file path
      required: [true, "Please upload the sermon document"],
    },
    datePreached: {
      type: Date,
      required: [true, "Please add the sermon date"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sermon", sermonSchema);
