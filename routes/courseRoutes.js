const express = require("express");
const router = express.Router();
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken);
// Routes for all courses
// Routes for all courses
router
  .route("/")
  .get(getCourses) // Get all courses
  .post(createCourse); // Create a new courses

// Routes for a single courses (by ID)
router
  .route("/:id")
  .get(getCourse) // Get a course by ID
  .put(updateCourse) // Update a course by ID
  .delete(deleteCourse); // Delete a course by ID

module.exports = router;
