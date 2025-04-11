const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadHandler");
const {
  getNews,
  getNew,
  createNews,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/").get(getNews).post(upload.single("image"), createNews); // File upload

router
  .route("/:id")
  .get(getNew)
  .put(upload.single("image"), updateNews) // File upload
  .delete(deleteNews);

module.exports = router;
