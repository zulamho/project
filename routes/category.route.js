const { Router } = require("express");
const { categoryController } = require("../controllers/category.controller");
const authMiddleware = require("../models/middlewares/auth.middleware")

const router = Router();

router.get("/categories", categoryController.getCategories);
router.post("/category",authMiddleware, categoryController.createCategory);
router.delete("/category/:id", authMiddleware, categoryController.deleteCategory);
router.patch("/category/:id", authMiddleware, categoryController.editCategory);

module.exports = router;
