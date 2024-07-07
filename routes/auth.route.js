const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { register, login, verifyEmail, forgetPassword, resetPassword } = require("../controllers/auth.controller");

router.post(
  "/register",
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("username").not().isEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Please include a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  register
);

router.post(
  "/login",
  [
    body("email").optional().isEmail().withMessage("Email must be a valid email"), // تعديل هنا: Optional للـ email
    body("username").optional().notEmpty().withMessage("Username is required if email is not provided"), // إضافة التحقق من username
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);


router.get("/verify-email", verifyEmail);

router.post(
  "/forget-password",
  [
    body("email").isEmail().withMessage("Please include a valid email"),
  ],
  forgetPassword
);

router.post(
  "/reset-password",
  [
    body("token").not().isEmpty().withMessage("Token is required"),
    body("newPassword").isLength({ min: 6 }).withMessage("New password must be at least 6 characters"),
  ],
  resetPassword
);

module.exports = router;
