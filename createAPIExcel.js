const xlsx = require('xlsx');

// بيانات الـ APIs التي نريد إضافتها إلى ملف Excel
const apiData = [
  { API: 'Register', Method: 'POST', URL: '/api/auth/register', Description: 'إنشاء حساب مستخدم جديد.' },
  { API: 'Login', Method: 'POST', URL: '/api/auth/login', Description: 'تسجيل الدخول للحصول على توكن JWT.' },
  { API: 'Add to Cart', Method: 'POST', URL: '/api/cart/:id', Description: 'إضافة منتج إلى سلة مستخدم محدد.' },
  { API: 'Delete Cart', Method: 'DELETE', URL: '/api/cart/:id', Description: 'حذف سلة مستخدم محدد.' },
  { API: 'Get Cart', Method: 'GET', URL: '/api/cart/:id', Description: 'الحصول على تفاصيل سلة مستخدم معين.' },
  { API: 'Update Cart', Method: 'PUT', URL: '/api/cart/:id', Description: 'تحديث تفاصيل سلة مستخدم معين.' },
  { API: 'Delete Product from Cart', Method: 'DELETE', URL: '/api/cart/:id/product/:productId', Description: 'حذف منتج معين من سلة مستخدم محدد.' },
  { API: 'Empty Cart', Method: 'POST', URL: '/api/cart/:id/empty', Description: 'تفريغ جميع المنتجات من سلة مستخدم محدد.' },
  { API: 'Checkout', Method: 'POST', URL: '/api/cart/:id/checkout', Description: 'إتمام عملية الشراء وتأكيد الطلب.' },
  { API: 'Update Product Quantity in Cart', Method: 'PUT', URL: '/api/cart/:id/product/:productId/quantity', Description: 'تحديث كمية منتج معين في سلة مستخدم محدد.' },
  { API: 'Get All Categories', Method: 'GET', URL: '/api/categories', Description: 'الحصول على قائمة بجميع الفئات.' },
  { API: 'Get Category by ID', Method: 'GET', URL: '/api/categories/:id', Description: 'الحصول على تفاصيل فئة محددة.' },
  { API: 'Create Category', Method: 'POST', URL: '/api/categories', Description: 'إضافة فئة جديدة إلى النظام.' },
  { API: 'Update Category', Method: 'PUT', URL: '/api/categories/:id', Description: 'تحديث تفاصيل فئة معينة.' },
  { API: 'Delete Category', Method: 'DELETE', URL: '/api/categories/:id', Description: 'حذف فئة محددة من النظام.' },
  { API: 'Add Sub-Category', Method: 'POST', URL: '/api/categories/add-sub-category', Description: 'إضافة فئة فرعية إلى فئة رئيسية.' },
  { API: 'Add Product to Category', Method: 'POST', URL: '/api/categories/add-product-to-category', Description: 'إضافة منتج إلى فئة معينة.' },
  { API: 'Create Product', Method: 'POST', URL: '/api/products', Description: 'إضافة منتج جديد إلى النظام.' },
  { API: 'Get All Products', Method: 'GET', URL: '/api/products', Description: 'الحصول على قائمة بجميع المنتجات.' },
  { API: 'Get Product by ID', Method: 'GET', URL: '/api/products/:id', Description: 'الحصول على تفاصيل منتج محدد.' },
  { API: 'Delete Product', Method: 'DELETE', URL: '/api/products/:id', Description: 'حذف منتج معين من النظام.' },
  { API: 'Update Product', Method: 'PUT', URL: '/api/products/:id', Description: 'تحديث تفاصيل منتج معين.' },
  { API: 'Add Product to Category', Method: 'POST', URL: '/api/products/add-product-to-category', Description: 'إضافة منتج إلى فئة معينة.' },
  { API: 'Add Related Product', Method: 'POST', URL: '/api/products/add-related-product', Description: 'إضافة منتج إلى قائمة المنتجات ذات الصلة.' },
  { API: 'Get All Users', Method: 'GET', URL: '/api/users', Description: 'الحصول على قائمة بجميع المستخدمين.' },
  { API: 'Create User', Method: 'POST', URL: '/api/users', Description: 'إضافة مستخدم جديد إلى النظام.' },
  { API: 'Edit User', Method: 'PUT', URL: '/api/users/:id', Description: 'تعديل بيانات مستخدم معين.' }
];

// تحويل البيانات إلى ورقة Excel
const worksheet = xlsx.utils.json_to_sheet(apiData);
const workbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(workbook, worksheet, 'APIs');

// كتابة ملف Excel إلى النظام
xlsx.writeFile(workbook, 'APIs_Template.xlsx');

console.log('ملف Excel تم إنشاؤه بنجاح!');
