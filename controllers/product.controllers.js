const Product = require("../models/Product.modul");  // تأكد من صحة المسار إلى النموذج

// إنشاء منتج جديد
const createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// الحصول على جميع المنتجات
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category', 'name')  // اجلب بيانات الفئة المرتبطة
      .populate('relatedProducts', 'name')  // اجلب بيانات المنتجات ذات الصلة
      .exec();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// الحصول على منتج حسب المعرف
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name')  // اجلب بيانات الفئة المرتبطة
      .populate('relatedProducts', 'name')  // اجلب بيانات المنتجات ذات الصلة
      .exec();
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// حذف منتج
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// تحديث منتج
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }  // اجلب الكائن المحدث
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// إضافة منتج إلى فئة
const addProductToCategory = async (req, res) => {
  try {
    const { productId, categoryId } = req.body;

    // إضافة المنتج إلى الفئة
    await Categories.findByIdAndUpdate(categoryId, {
      $addToSet: { products: productId }  // إضافة المنتج إلى قائمة المنتجات
    });

    // تعيين الفئة للمنتج
    await Product.findByIdAndUpdate(productId, {
      category: categoryId
    });

    res.status(200).json({ message: 'Product added to category successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// إضافة منتج إلى قائمة المنتجات ذات الصلة
const addRelatedProduct = async (req, res) => {
  try {
    const { productId, relatedProductId } = req.body;

    // إضافة المنتج ذي الصلة
    await Product.findByIdAndUpdate(productId, {
      $addToSet: { relatedProducts: relatedProductId }  // إضافة المنتج إلى قائمة المنتجات ذات الصلة
    });

    res.status(200).json({ message: 'Related product added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { 
  createProduct, 
  getAllProducts, 
  getProductById, 
  deleteProduct, 
  updateProduct,
  addProductToCategory,
  addRelatedProduct
}
