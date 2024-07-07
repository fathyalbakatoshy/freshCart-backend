const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../services/emailService");

// تسجيل المستخدم
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, username, email, password, address, phone } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ message: "User or Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
      address,
      phone,
      isVerified: false,
    });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// تسجيل الدخول
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;
    // يجب أن يكون هناك { $or: [ ... ] } بدلاً من { $or: { email } }
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (!user) {
      return res.status(400).json({ message: "Email or Username or Password is incorrect" });
    }

    if (!user.isActive) {
      return res.status(400).json({ message: "Your account is not activated" });
    }

    // if (!user.isVerified) {
    //   return res.status(400).json({ message: "Your account is not verified" });
    // }

    if (user.isBlocked) {
      return res.status(400).json({ message: "Your account has been blocked by the Admin" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email or Username or Password is incorrect" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        username: user.username,
        email: user.email,
        address: user.address,
        phone: user.phone,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// التحقق من البريد الإلكتروني
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "Invalid or missing token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await User.findByIdAndUpdate(decoded.userId, { isVerified: true });

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

// استعادة كلمة المرور
const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "No account found with this email" });
    }

    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const resetUrl = `http://localhost:3000/api/auth/reset-password?token=${resetToken}`;

    await sendEmail(user.email, "Password Reset", `Please reset your password by clicking the following link: ${resetUrl}`);

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// تغيير كلمة المرور
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(decoded.userId, { password: hashedPassword });

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

module.exports = { register, login, verifyEmail, forgetPassword, resetPassword };
