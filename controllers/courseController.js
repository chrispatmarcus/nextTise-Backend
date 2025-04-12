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
  console.log("the request body is :", req.body);
  const { name, subject, location, date } = req.body;
  if (!name || !subject || !location || !date) {
    res.status(400);
    throw new Error("ALL fields are mandatory");
  }

  const course = await Course.create({
    name,
    subject,
    location,
    date,
  });

  res.status(201).json(course);
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
    throw new Error("Course not found");
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

// const asyncHandler = require("express-async-handler");
// const Contact = require("../models/contactModels");
// const News = require("../models/newsModel")
// const { ReturnDocument } = require("mongodb");

// //@desc Get all contacts
// //@route GET /api/contacts
// //@access private
// const getContacts = asyncHandler(async (req, res) => {
//   const contacts = await Contact.find({ user_id: req.user.id });
//   res.status(200).json(contacts);
// });

// //@desc Get selected contacts
// //@route GET /api/contacts
// //@access private
// const getContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(404);
//     throw new Error("Contact not found");
//   }

//   res.status(200).json(contact);
// });

// //@desc create new contacts
// //@route POST /api/contacts
// //@access private
// const createContact = asyncHandler(async (req, res) => {
//   console.log("the request body is :", req.body);
//   const { name, email, phone } = req.body;
//   if (!name || !email || !phone) {
//     res.status(400);
//     throw new Error("ALL fields are mandatory");
//   }

//   const contact = await Contact.create({
//     name,
//     email,
//     phone,
//     user_id: req.user.id,
//   });

//   res.status(201).json(contact);
// });
// //@desc update new contacts
// //@route PUT /api/contacts
// //@access private
// const updateContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(404);
//     throw new Error("Contact not found");
//   }
//   //condition to check if the user is updating only his own contacts he created
//   // if (contact.user_id.toString() !== req.user.id) {
//   //   res.status(403);
//   //   throw new Error(
//   //     "user don't have permission to update other user conatacts"
//   //   );
//   // }

//   const updatedContact = await Contact.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );

//   res.status(200).json(updatedContact);
// });
// //@desc delete new contacts
// //@route DELETE /api/contacts
// //@access private
// const deleteContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(404);
//     throw new Error("Contact not found");
//   }

//   //condition to check if the user is deleting only his own contacts he created
//   // if (contact.user_id.toString() !== req.user.id) {
//   //   res.status(403);
//   //   throw new Error(
//   //     "user don't have permission to delete other user conatacts"
//   //   );
//   // }
//   // //delete all contacts in the database
//   // await Contact.remove();
//   // deletes a particular contact in the database
//   await Contact.deleteOne({ _id: req.params.id });
//   res.status(200).json(contact);
// });

// module.exports = {
//   getContacts,
//   getContact,
//   createContact,
//   updateContact,
//   deleteContact,
// };
