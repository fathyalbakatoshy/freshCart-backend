// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/adminController");
const { authMiddleware } = require('../middlewares/auth.Middleware');
const { roleMiddleware } = require('../middlewares/role.Middleware');

router.get("/status", authMiddleware, roleMiddleware("SuperAdmin", "Admin", "Sales"), getDashboardStats);

module.exports = router;
