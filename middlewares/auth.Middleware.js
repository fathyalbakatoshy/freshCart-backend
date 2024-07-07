const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // احصل على التوكن من رأس Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // تحقق من وجود التوكن
  if (!token) return res.status(401).json({ message: "No Token" });

  try {
    // التحقق من صحة التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // أضف بيانات المستخدم المستخرجة من التوكن إلى الطلب
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = { authMiddleware };
