const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,  // اسم المنتج
    required: [true, 'Product name is required'],  // مطلوب
    trim: true,  // إزالة المسافات الزائدة
    minlength: [3, 'Product name must be at least 3 characters long']  // الحد الأدنى لطول الاسم
  },

  price: {
    type: Number,  // سعر المنتج
    required: [true, 'Product price is required'],  // مطلوب
    min: [0, 'Price must be a positive number']  // يجب أن يكون السعر موجباً
  },

  image: {
    type: String,  // رابط صورة المنتج
    required: [true, 'Product image URL is required'],  // مطلوب
    trim: true  // إزالة المسافات الزائدة
  },

  description: {
    type: String,  // وصف المنتج
    trim: true  // إزالة المسافات الزائدة
  },

  isActive: {
    type: Boolean,  // حالة تفعيل المنتج
    default: true  // افتراضيًا يكون المنتج مفعلًا
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,  // معرف فئة المنتج
    ref: 'Category',  // مرجعية إلى نموذج Category
    required: [true, 'Product category is required']  // مطلوب
  },

  stock: {
    type: Number,  // كمية المخزون المتوفرة
    default: 0,  // القيمة الافتراضية هي 0
    min: [0, 'Stock cannot be negative']  // لا يمكن أن يكون المخزون سالبًا
  },

  quantity: {
    type: Number,  // كمية المنتج المطلوبة عند إضافته للسلة
    default: 1,  // القيمة الافتراضية هي 1
    min: [1, 'Quantity must be at least 1']  // يجب أن تكون الكمية على الأقل 1
  },

  averageRating: {
    type: Number,  // متوسط التقييمات
    default: 0,  // القيمة الافتراضية هي 0
    min: [0, 'Rating cannot be negative'],  // لا يمكن أن يكون التقييم سالبًا
    max: [5, 'Rating cannot exceed 5'],  // لا يمكن أن يتجاوز التقييم 5
    set: (v) => Math.round(v * 10) / 10  // تقريبه لأقرب عشر
  },

  brand: {
    type: String,  // علامة تجارية للمنتج
    trim: true  // إزالة المسافات الزائدة
  },

  discount: {
    type: Number,  // نسبة الخصم
    default: 0,  // القيمة الافتراضية هي 0
    min: [0, 'Discount cannot be negative'],  // لا يمكن أن يكون الخصم سالبًا
    max: [100, 'Discount cannot exceed 100']  // لا يمكن أن يتجاوز الخصم 100%
  },

  isTrend: {
    type: Boolean,  // لتحديد إذا كان المنتج من المنتجات الرائجة
    default: false  // افتراضيًا لا يكون المنتج رائجًا
  },

  onSale: {
    type: Boolean,  // لتحديد إذا كان المنتج في عرض ترويجي
    default: false  // افتراضيًا لا يكون المنتج في عرض ترويجي
  },

  onSalePrice: {
    type: Number,  // سعر المنتج أثناء العرض الترويجي
    min: [0, 'Sale price must be a positive number']  // يجب أن يكون السعر موجباً
  },

  onSaleStartDate: {
    type: Date  // تاريخ بدء العرض الترويجي
  },

  onSaleEndDate: {
    type: Date  // تاريخ انتهاء العرض الترويجي
  },

  onSaleDiscount: {
    type: Number,  // نسبة الخصم أثناء العرض الترويجي
    min: [0, 'Sale discount cannot be negative'],  // لا يمكن أن يكون الخصم سالبًا
    max: [100, 'Sale discount cannot exceed 100']  // لا يمكن أن يتجاوز الخصم 100%
  },

  featured: {
    type: Boolean,  // لتحديد إذا كان المنتج مميزًا
    default: false  // افتراضيًا لا يكون المنتج مميزًا
  },

  tags: {
    type: [String],  // قائمة بالعلامات أو الكلمات المفتاحية للمنتج
    trim: true  // إزالة المسافات الزائدة
  },

  relatedProducts: [{
    type: mongoose.Schema.Types.ObjectId,  // معرفات المنتجات ذات الصلة
    ref: 'Product'  // مرجعية إلى نموذج Product
  }],
}, 
{ timestamps: true }  // إضافة timestamps: createdAt و updatedAt
);

productSchema.index({ name: 1 });  // فهرسة اسم المنتج للبحث السريع
productSchema.index({ category: 1 });  // فهرسة فئة المنتج للبحث السريع

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
