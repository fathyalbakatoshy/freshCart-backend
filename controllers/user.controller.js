const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createUser = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // تحقق إذا كان اسم المستخدم موجود مسبقاً
    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res.status(400).json({ message: "Username already exists" });

    // تحقق إذا كان الإيميل موجود مسبقاً
    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ message: "Email already exists" });

    // تحقق إذا كان رقم الهاتف موجود مسبقاً
    const existingPhone = await User.findOne({ phone });
    if (existingPhone)
      return res.status(400).json({ message: "Phone number already exists" });

    // تشفير كلمة المرور
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // إنشاء المستخدم الجديد مع كلمة المرور المشفرة
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();

    // تحويل المستخدم إلى JSON واستبعاد كلمة المرور
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, phone, address, image, isActive, isVerified, isBlocked } = req.body;

    // العثور على المستخدم باستخدام ID
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // إعداد الحقول التي سيتم تحديثها بناءً على القيم الموجودة في الطلب
    const updateFields = {};

    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (phone) updateFields.phone = phone;
    if (address) updateFields.address = address;
    if (image) updateFields.image = image;
    if (typeof isActive !== 'undefined') updateFields.isActive = isActive;
    if (typeof isVerified !== 'undefined') updateFields.isVerified = isVerified;
    if (typeof isBlocked !== 'undefined') updateFields.isBlocked = isBlocked;

    // التحقق مما إذا كانت كلمة المرور موجودة في الطلب
    if (password) {
      // تشفير كلمة المرور
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;  // إضافة كلمة المرور المشفرة إلى حقول التحديث
    }

    // تحديث بيانات المستخدم
    const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });

    // تحويل المستخدم إلى JSON واستبعاد كلمة المرور
    const userResponse = updatedUser.toObject();
    delete userResponse.password;

    res.status(200).json(userResponse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = { getAllUsers, createUser, editUser, deleteUser, getUser };
