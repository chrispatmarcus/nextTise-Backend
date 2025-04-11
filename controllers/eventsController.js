const asyncHandler = require("express-async-handler");
const Event = require("../models/eventsModel");

// @desc Get all Events
// @route GET /api/event
// @access Private
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();
  res.status(200).json(events);
});

// @desc Get a single Event
// @route GET /api/event/:id
// @access Private
const getEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }
  res.status(200).json(event);
});

// @desc Create a new Event
// @route POST /api/event
// @access Private
const createEvent = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Image upload is required");
  }

  const { title, description } = req.body;

  const event = await Event.create({
    title,
    imagePath: req.file.path,
    description,
  });

  res.status(201).json(event);
});

// @desc Update Event
// @route PUT /api/event/:id
// @access Private
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  const updatedData = { ...req.body };
  if (req.file) {
    updatedData.imagePath = req.file.path;
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    req.params.id,
    updatedData,
    {
      new: true,
    }
  );

  res.status(200).json(updatedEvent);
});

// @desc Delete Event
// @route DELETE /api/event/:id
// @access Private
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  await Event.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "Event deleted successfully" });
});

module.exports = { getEvents, getEvent, createEvent, updateEvent, deleteEvent };
