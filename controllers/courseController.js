const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");

//@desc Get all courses
//@route GET /api/courses
//@access private
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ user_id: req.user.id });
  res.status(200).json(courses);
});

//@desc Get selected course
//@route GET /api/courses/:id
//@access private
const getCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  res.status(200).json(course);
});

//@desc Create new course
//@route POST /api/courses
//@access private

const createCourse = asyncHandler(async (req, res) => {
  console.log("Request body:", req.body);
  const { name, description, instructor, duration } = req.body;

  if (!name || !description || !instructor || !duration) {
    res.status(400);
    throw new Error("All fields are required");
  }

  try {
    const course = await Course.create({
      name,
      description,
      instructor,
      duration,
    });
    console.log("Course created:", course);
    res.status(201).json(course);
  } catch (error) {
    console.error("Error creating course:", error.message);
    res.status(500).json({ message: error.message });
  }
});

//@desc Update course
//@route PUT /api/courses/:id
//@access private
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  // Condition to check if the user is updating only their own courses
  // Uncomment if you want to enforce this check.
  // if (course.user_id.toString() !== req.user.id) {
  //   res.status(403);
  //   throw new Error(
  //     "User doesn't have permission to update other users' courses"
  //   );
  // }

  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedCourse);
});

//@desc Delete course
//@route DELETE /api/courses/:id
//@access private
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(404);
    throw new Error("Course is not  found. enter correct id");
  }

  // Condition to check if the user is deleting only their own courses
  // Uncomment if you need to enforce this check.
  // if (course.user_id.toString() !== req.user.id) {
  //   res.status(403);
  //   throw new Error(
  //     "User doesn't have permission to delete other users' courses"
  //   );
  // }

  // Deletes a particular course in the database
  await Course.deleteOne({ _id: req.params.id });
  res.status(200).json(course);
});

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
