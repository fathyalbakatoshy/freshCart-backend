const express = require("express");
const { 
  createProduct, 
  getAllProducts, 
  getProductById, 
  deleteProduct, 
  updateProduct, 
  addProductToCategory,  // إضافة منتج إلى فئة
  addRelatedProduct  // إضافة منتج إلى قائمة المنتجات ذات الصلة
} = require("../controllers/product.controllers");
const { authMiddleware } = require('../middlewares/auth.Middleware');
const { roleMiddleware } = require('../middlewares/role.Middleware');

const router = express.Router();

// إنشاء منتج جديد
router.post('/', authMiddleware, roleMiddleware('Admin', 'SuperAdmin', 'Sales'), createProduct);

// الحصول على جميع المنتجات
router.get('/', getAllProducts);

// الحصول على منتج حسب المعرف
router.get('/:id', getProductById);

// حذف منتج
router.delete('/:id', authMiddleware, roleMiddleware('Admin', 'SuperAdmin'), deleteProduct);

// تحديث منتج
router.put('/:id', authMiddleware, roleMiddleware('Admin', 'SuperAdmin'), updateProduct);

// إضافة منتج إلى فئة
router.post('/add-product-to-category', authMiddleware, roleMiddleware('Admin', 'SuperAdmin'), addProductToCategory);

// إضافة منتج إلى قائمة المنتجات ذات الصلة
router.post('/add-related-product', authMiddleware, roleMiddleware('Admin', 'SuperAdmin'), addRelatedProduct);

module.exports = router;
