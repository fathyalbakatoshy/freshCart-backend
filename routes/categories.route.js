const express = require("express");
const {
  createCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
  getAllCategories,
  addSubCategory,  // إضافة فئة فرعية
  addProductToCategory  // إضافة منتج إلى فئة
} = require("../controllers/categories.controllers");
const { authMiddleware } = require("../middlewares/auth.Middleware");
const { roleMiddleware } = require("../middlewares/role.Middleware");

const router = express.Router();

// الحصول على جميع الفئات
router.get("/", getAllCategories);

// الحصول على فئة حسب المعرف
router.get("/:id", getCategoryById);

// إضافة فئة جديدة
router.post("/", authMiddleware, roleMiddleware("Admin", "SuperAdmin", "Sales"), createCategory);

// تحديث فئة
router.put("/:id", authMiddleware, roleMiddleware("Admin", "SuperAdmin", "Sales"), updateCategory);

// حذف فئة
router.delete("/:id", authMiddleware, roleMiddleware("Admin", "SuperAdmin"), deleteCategory);

// إضافة فئة فرعية إلى فئة رئيسية
router.post('/add-sub-category', authMiddleware, roleMiddleware('Admin', 'SuperAdmin', 'Sales'), addSubCategory);

// إضافة منتج إلى فئة
router.post('/add-product-to-category', authMiddleware, roleMiddleware('Admin', 'SuperAdmin', 'Sales'), addProductToCategory);

module.exports = router;
