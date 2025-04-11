const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadSermonHandler");
const {
  createMeditation,
  getMeditation,
  updateMeditation,
  deleteMeditation,
  getMeditations,
} = require("../controllers/meditationController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router
  .route("/")
  .get(getMeditations)
  .post(upload.single("document"), createMeditation); // File upload

router
  .route("/:id")
  .get(getMeditation)
  .put(upload.single("image"), updateMeditation) // File upload
  .delete(deleteMeditation);
// router.post("/", upload.single("document"), createMeditation);

module.exports = router;
