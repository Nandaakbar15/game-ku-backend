const express = require("express");
const router = express();

const {
  getAllCategories,
  getCategoriesById,
  addCategories,
} = require("../controllers/categoriesController");

router.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: "Gameku API",
  });
});

// routes categories
router.get("/api/categories", getAllCategories);
router.get("/api/categories/:id", getCategoriesById);
router.post("/api/addCategories", addCategories);

module.exports = router;
