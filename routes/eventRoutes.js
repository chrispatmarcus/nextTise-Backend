const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadHandler");
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventsController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/").get(getEvents).post(upload.single("image"), createEvent); // File upload

router
  .route("/:id")
  .get(getEvent)
  .put(upload.single("image"), updateEvent) // File upload
  .delete(deleteEvent);

module.exports = router;
