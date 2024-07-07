const Cart = require('../models/Cart.modul.js');  // تأكد من صحة المسار إلى النموذج
const Product = require('../models/Product.modul.js');  // تأكد من صحة المسار إلى النموذج

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.params.id;  // احصل على `userId` من معلمات الـ URL

  try {
    // تحقق من صحة المنتج
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // تحقق من وجود سلة للمستخدم
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [{ productId, quantity, price: product.price }],
      });
    } else {
      const existingProduct = cart.products.find(
        (p) => p.productId.toString() === productId
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity, price: product.price });
      }
    }

    // احسب الكميات المتبقية في المخزون
    product.stock -= quantity;
    await product.save();

    // احسب `subTotal` و `total` بعد التعديلات
    cart.subTotal = cart.products.reduce(
      (acc, p) => acc + (p.quantity * p.price),
      0
    );
    cart.total = cart.subTotal - cart.discount + cart.tax;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCart = async (req, res) => {
  const userId = req.params.userId || req.user._id;  // استخدام `userId` من المعلمات إذا كان متاحاً، وإلا استخدم `req.user._id`
  try {
    const cart = await Cart.findOne({ user: userId });  // ابحث عن سلة المستخدم بناءً على `userId`
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedCart) return res.status(404).json({ message: 'Cart not found' });
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProductFromCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === req.params.productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    cart.products.splice(productIndex, 1);

    // احسب `subTotal` و `total` بعد الحذف
    cart.subTotal = cart.products.reduce(
      (acc, p) => acc + (p.quantity * p.price),
      0
    );
    cart.total = cart.subTotal - cart.discount + cart.tax;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const emptyCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.products = [];
    cart.subTotal = 0;
    cart.total = 0;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkout = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // المنطق الخاص بإتمام عملية الشراء هنا
    // يمكن إضافة تفاصيل الطلب، الدفع، الخ...

    cart.status = 'CheckedOut';
    await cart.save();
    res.status(200).json({ message: 'Checkout successful', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === req.params.productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    cart.products[productIndex].quantity = req.body.quantity;

    // احسب `subTotal` و `total` بعد التعديلات
    cart.subTotal = cart.products.reduce(
      (acc, p) => acc + (p.quantity * p.price),
      0
    );
    cart.total = cart.subTotal - cart.discount + cart.tax;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addToCart,
  deleteCart,
  getCart,
  updateCart,
  deleteProductFromCart,
  emptyCart,
  checkout,
  updateQuantity
};
