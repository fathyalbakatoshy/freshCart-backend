const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,  // معرف المستخدم
    ref: 'User',  // مرجعية إلى نموذج User
    required: [true, 'User ID is required'],  // مطلوب
  },

  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,  // معرف المنتج
      ref: 'Product',  // مرجعية إلى نموذج Product
      required: [true, 'Product ID is required'],  // مطلوب
    },
    quantity: {
      type: Number,  // كمية المنتج في السلة
      required: [true, 'Quantity is required'],  // مطلوب
      min: [1, 'Quantity must be at least 1'],  // الكمية يجب أن تكون على الأقل 1
    },
    price: {
      type: Number,  // سعر المنتج عند إضافته للسلة
      required: [true, 'Price is required'],  // مطلوب
      min: [0, 'Price must be a positive number'],  // السعر يجب أن يكون موجباً
    },
    discount: {
      type: Number,  // نسبة الخصم على المنتج
      default: 0,  // القيمة الافتراضية هي 0
      min: [0, 'Discount cannot be negative'],  // لا يمكن أن يكون الخصم سالبًا
      max: [100, 'Discount cannot exceed 100']  // لا يمكن أن يتجاوز الخصم 100%
    },
  }],

  subTotal: {
    type: Number,  // المجموع الفرعي للمنتجات قبل الضرائب والخصومات
    default: 0,  // القيمة الافتراضية هي 0
    min: [0, 'SubTotal cannot be negative'],  // لا يمكن أن يكون المجموع الفرعي سالبًا
  },

  discount: {
    type: Number,  // خصم إجمالي يتم تطبيقه على سلة التسوق
    default: 0,  // القيمة الافتراضية هي 0
    min: [0, 'Discount cannot be negative'],  // لا يمكن أن يكون الخصم سالبًا
    max: [100, 'Discount cannot exceed 100']  // لا يمكن أن يتجاوز الخصم 100%
  },

  tax: {
    type: Number,  // ضريبة مطبقة على السلة
    default: 0,  // القيمة الافتراضية هي 0
    min: [0, 'Tax cannot be negative'],  // لا يمكن أن تكون الضريبة سلبية
  },

  total: {
    type: Number,  // السعر النهائي بعد تطبيق الخصومات والضرائب
    default: 0,  // القيمة الافتراضية هي 0
    min: [0, 'Total cannot be negative'],  // لا يمكن أن يكون الإجمالي سالبًا
  },

  status: {
    type: String,  // حالة السلة (مثلاً: Active, CheckedOut)
    enum: ['Active', 'CheckedOut'],  // القيم الممكنة
    default: 'Active',  // القيمة الافتراضية هي 'Active'
  }
},
{ timestamps: true }  // إضافة timestamps: createdAt و updatedAt
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
