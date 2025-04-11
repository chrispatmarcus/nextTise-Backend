const asyncHandler = require("express-async-handler");
const News = require("../models/newsModel");

// @desc Get all news
// @route GET /api/news
// @access Private
const getNews = asyncHandler(async (req, res) => {
  const news = await News.find();
  res.status(200).json(news);
});

// @desc Get a single news
// @route GET /api/news/:id
// @access Private
const getNew = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) {
    res.status(404);
    throw new Error("Event not found");
  }
  res.status(200).json(news);
});

// @desc Create a new news
// @route POST /api/news
// @access Private
const createNews = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Image upload is required");
  }

  const { title, description } = req.body;

  const news = await News.create({
    title,
    imagePath: req.file.path,
    description,
  });

  res.status(201).json(news);
});

// @desc Update news
// @route PUT /api/news/:id
// @access Private
const updateNews = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) {
    res.status(404);
    throw new Error("news not found");
  }

  const updatedData = { ...req.body };
  if (req.file) {
    updatedData.imagePath = req.file.path;
  }

  const updatedNews = await News.findByIdAndUpdate(req.params.id, updatedData, {
    new: true,
  });

  res.status(200).json(updatedNews);
});

// @desc Delete news
// @route DELETE /api/news/:id
// @access Private
const deleteNews = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) {
    res.status(404);
    throw new Error("Event not found");
  }

  await News.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "news deleted successfully" });
});

module.exports = { getNews, getNew, createNews, updateNews, deleteNews };
