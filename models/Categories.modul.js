const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,  // اسم الفئة
    required: [true, 'Category name is required'],  // مطلوب
    trim: true,  // إزالة المسافات الزائدة
    minlength: [3, 'Category name must be at least 3 characters long']  // الحد الأدنى لطول الاسم
  },

  image: {
    type: String,  // رابط صورة الفئة
    required: [true, 'Category image URL is required'],  // مطلوب
    trim: true  // إزالة المسافات الزائدة
  },

  description: {
    type: String,  // وصف الفئة
    trim: true  // إزالة المسافات الزائدة
  },

  isActive: {
    type: Boolean,  // حالة تفعيل الفئة
    default: true  // افتراضيًا تكون الفئة مفعلة
  },

  parent: {
    type: mongoose.Schema.Types.ObjectId,  // معرف الفئة الرئيسية
    ref: 'Category',  // مرجعية إلى نموذج Category نفسه
    default: null  // قيمة افتراضية فارغة إذا لم يكن هناك فئة رئيسية
  },

  subCategories: [{
    type: mongoose.Schema.Types.ObjectId,  // معرفات الفئات الفرعية
    ref: 'Category'  // مرجعية إلى نموذج Category نفسه
  }],

  products: [{
    type: mongoose.Schema.Types.ObjectId,  // معرفات المنتجات المرتبطة بالفئة
    ref: 'Product'  // مرجعية إلى نموذج Product
  }],

  featured: {
    type: Boolean,  // لتحديد إذا كانت الفئة مميزة
    default: false  // افتراضيًا لا تكون الفئة مميزة
  },

  tags: {
    type: [String],  // قائمة بالعلامات أو الكلمات المفتاحية للفئة
    trim: true  // إزالة المسافات الزائدة
  },

  metaTitle: {
    type: String,  // عنوان SEO للفئة
    trim: true  // إزالة المسافات الزائدة
  },

  metaDescription: {
    type: String,  // وصف SEO للفئة
    trim: true  // إزالة المسافات الزائدة
  }

}, 
{ timestamps: true }  // إضافة timestamps: createdAt و updatedAt
);

categorySchema.index({ name: 1 });  // فهرسة اسم الفئة للبحث السريع
categorySchema.index({ parent: 1 });  // فهرسة الفئة الرئيسية

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
