const Categories = require("../models/Categories.modul");  // تأكد من صحة المسار إلى النموذج

// الحصول على جميع الفئات
const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find()
      .populate('subCategories', 'name image')  // اجلب البيانات الأساسية للفئات الفرعية
      .populate('products', 'name price image')  // اجلب البيانات الأساسية للمنتجات المرتبطة
      .exec();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// الحصول على فئة حسب المعرف
const getCategoryById = async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id)
      .populate('subCategories', 'name image')  // اجلب البيانات الأساسية للفئات الفرعية
      .populate('products', 'name price image')  // اجلب البيانات الأساسية للمنتجات المرتبطة
      .exec();
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// حذف فئة
const deleteCategory = async (req, res) => {
  try {
    await Categories.findByIdAndDelete(req.params.id);
    res.status(200).json("Category has been deleted...");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// تحديث فئة
const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Categories.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }  // اجلب الكائن المحدث
    );
    if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// إنشاء فئة جديدة
const createCategory = async (req, res) => {
  const existingCategory = await Categories.findOne({ name: req.body.name });
  if (existingCategory)
    return res.status(400).json({ message: "Category already exists" });

  const category = new Categories(req.body);
  try {
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// إضافة فئة فرعية إلى فئة رئيسية
const addSubCategory = async (req, res) => {
  try {
    const { parentId, subCategoryId } = req.body;

    // إضافة الفئة الفرعية إلى الفئة الرئيسية
    await Categories.findByIdAndUpdate(parentId, {
      $addToSet: { subCategories: subCategoryId }  // إضافة الفئة الفرعية
    });

    // تعيين الفئة الرئيسية للفئة الفرعية
    await Categories.findByIdAndUpdate(subCategoryId, {
      parent: parentId
    });

    res.status(200).json({ message: 'Sub-category added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// إضافة منتج إلى فئة
const addProductToCategory = async (req, res) => {
  try {
    const { categoryId, productId } = req.body;

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

module.exports = { 
  createCategory, 
  getCategoryById, 
  deleteCategory, 
  updateCategory, 
  getAllCategories,
  addSubCategory,
  addProductToCategory
}
