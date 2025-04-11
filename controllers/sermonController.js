const asyncHandler = require("express-async-handler");
const Sermon = require("../models/sermonModel");

// Create Sermon
const createSermon = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Sermon document is required");
  }

  const { title, text, preacher, datePreached } = req.body;
  const sermon = await Sermon.create({
    title,
    text,
    preacher,
    documentPath: req.file.path,
    datePreached,
  });

  res.status(201).json(sermon);
});

// Other CRUD operations (get, update, delete) follow the same pattern as events

// @desc Update Sermon
// @route PUT /api/Sermon/:id
// @access Private
const updateSermon = asyncHandler(async (req, res) => {
  const sermon = await Sermon.findById(req.params.id);
  if (!sermon) {
    res.status(404);
    throw new Error("Event not found");
  }

  const updatedData = { ...req.body };
  if (req.file) {
    updatedData.imagePath = req.file.path;
  }

  const updatedSermon = await Sermon.findByIdAndUpdate(
    req.params.id,
    updatedData,
    {
      new: true,
    }
  );

  res.status(200).json(updatedSermon);
});

// @desc Delete Sermon
// @route DELETE /api/sermon/:id
// @access Private
const deleteSermon = asyncHandler(async (req, res) => {
  const sermon = await Sermon.findById(req.params.id);
  if (!sermon) {
    res.status(404);
    throw new Error("Event not found");
  }

  await Sermon.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "Event deleted successfully" });
});

// @desc Get all sermons
// @route GET /api/sermon
// @access Private
const getSermons = asyncHandler(async (req, res) => {
  const sermons = await Sermon.find();
  res.status(200).json(sermons);
});

// @desc Get a single sermon
// @route GET /api/sermon/:id
// @access Private
const getSermon = asyncHandler(async (req, res) => {
  const sermon = await Sermon.findById(req.params.id);
  if (!sermon) {
    res.status(404);
    throw new Error("Event not found");
  }
  res.status(200).json(sermon);
});

module.exports = {
  getSermons,
  getSermon,
  createSermon,
  updateSermon,
  deleteSermon,
};
