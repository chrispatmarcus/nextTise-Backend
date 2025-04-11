const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadSermonHandler");
const {
  createSermon,
  getSermon,
  updateSermon,
  deleteSermon,
  getSermons,
} = require("../controllers/sermonController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/").get(getSermons).post(upload.single("document"), createSermon); // File upload

router
  .route("/:id")
  .get(getSermon)
  .put(upload.single("image"), updateSermon) // File upload
  .delete(deleteSermon);
// router.post("/", upload.single("document"), createSermon);

module.exports = router;
