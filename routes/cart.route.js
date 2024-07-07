const express = require('express');
const {
  addToCart,
  deleteCart,
  getCart,
  updateCart,
  deleteProductFromCart,
  emptyCart,
  checkout,
  updateQuantity,
} = require('../controllers/cart.controller.js');
const { authMiddleware } = require('../middlewares/auth.Middleware');

const router = express.Router();

// إضافة منتج إلى سلة المستخدم بناءً على `userId`
router.post('/:id', authMiddleware, addToCart);  // إضافة `authMiddleware` لضمان وجود التوكن
router.delete('/:id', authMiddleware, deleteCart);  // حذف سلة
router.get('/:id', authMiddleware, getCart);  // الحصول على سلة مستخدم معين بناءً على `userId`
router.put('/:id', authMiddleware, updateCart);  // تحديث السلة
router.delete('/:id/product/:productId', authMiddleware, deleteProductFromCart);  // حذف منتج من السلة
router.post('/:id/empty', authMiddleware, emptyCart);  // تفريغ السلة
router.post('/:id/checkout', authMiddleware, checkout);  // إتمام عملية الشراء
router.put('/:id/product/:productId/quantity', authMiddleware, updateQuantity);  // تحديث كمية المنتج في السلة

module.exports = router;
