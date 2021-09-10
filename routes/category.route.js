const { Router } = require("express");
const { categoryController } = require("../controllers/category.controller");

const router = Router();

router.get("/category", categoryController.getCategories);
router.post("/category", categoryController.createCategory);
router.delete("/category/:id", categoryController.deleteCategory);
router.patch("/category/:id", categoryController.editCategory);

module.exports = router;
