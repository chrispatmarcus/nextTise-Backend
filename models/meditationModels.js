const mongoose = require("mongoose");

const meditationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a meditation title"],
    },
    text: {
      type: String,
      required: [true, "Please add meditation text"],
    },
    preacher: {
      type: String,
      required: [true, "Please add meditation name"],
    },
    documentPath: {
      type: String, // Stores document file path
      required: [true, "Please upload the meditation document"],
    },
    datePreached: {
      type: Date,
      required: [true, "Please add the meditation date"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meditation", meditationSchema);
