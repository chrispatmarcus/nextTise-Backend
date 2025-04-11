const asyncHandler = require("express-async-handler");
const Meditation = require("../models/meditationModels");

// Create Meditation
const createMeditation = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Meditation document is required");
  }

  const { title, text, preacher, datePreached } = req.body;
  const meditation = await Meditation.create({
    title,
    text,
    preacher,
    documentPath: req.file.path,
    datePreached,
  });

  res.status(201).json(meditation);
});

// Other CRUD operations (get, update, delete) follow the same pattern as events

// @desc Update meditation
// @route PUT /api/meditation/:id
// @access Private
const updateMeditation = asyncHandler(async (req, res) => {
  const meditation = await Meditation.findById(req.params.id);
  if (!meditation) {
    res.status(404);
    throw new Error("meditation not found");
  }

  const updatedData = { ...req.body };
  if (req.file) {
    updatedData.imagePath = req.file.path;
  }

  const updatedMeditation = await Meditation.findByIdAndUpdate(
    req.params.id,
    updatedData,
    {
      new: true,
    }
  );

  res.status(200).json(updatedMeditation);
});

// @desc Delete meditation
// @route DELETE /api/meditation/:id
// @access Private
const deleteMeditation = asyncHandler(async (req, res) => {
  const meditation = await Meditation.findById(req.params.id);
  if (!meditation) {
    res.status(404);
    throw new Error("meditation not found");
  }

  await Meditation.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "meditation deleted successfully" });
});

// @desc Get all meditation
// @route GET /api/meditation
// @access Private
const getMeditations = asyncHandler(async (req, res) => {
  const meditation = await Meditation.find();
  res.status(200).json(meditation);
});

// @desc Get a single meditation
// @route GET /api/meditation/:id
// @access Private
const getMeditation = asyncHandler(async (req, res) => {
  const meditation = await Meditation.findById(req.params.id);
  if (!meditation) {
    res.status(404);
    throw new Error("Event not found");
  }
  res.status(200).json(meditation);
});

module.exports = {
  getMeditations,
  getMeditation,
  createMeditation,
  updateMeditation,
  deleteMeditation,
};
