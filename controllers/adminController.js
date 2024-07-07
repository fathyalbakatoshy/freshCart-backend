// controllers/adminController.js
const User = require("../models/User");
const Product = require("../models/Product.modul");

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    // Get total number of customers
    const totalCustomers = await User.countDocuments({ role: "Customer" });

    // Get number of newly registered customers in the past 30 days
    const newCustomers = await User.countDocuments({
      role: "Customer",
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    });

    // Get total number of products
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      totalCustomers,
      newCustomers,
      totalProducts,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };
