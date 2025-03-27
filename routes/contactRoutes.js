const express = require("express");
const router = express.Router();
const {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getContacts,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
// Routes for all contacts
router
  .route("/")
  .get(getContacts) // Get all contacts
  .post(createContact); // Create a new contact

// Routes for a single contact (by ID)
router
  .route("/:id")
  .get(getContact) // Get a contact by ID
  .put(updateContact) // Update a contact by ID
  .delete(deleteContact); // Delete a contact by ID

module.exports = router;
