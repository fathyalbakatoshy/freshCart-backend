const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["SuperAdmin", "Admin", "Customer", "Sales"],
      default: "Customer",
    },
    phone: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    address: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Notification" }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Favorite" }],
    addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
    payments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment" }],
    points: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    totalOrders: { type: Number, default: 0 },
    totalProducts: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    totalFavorites: { type: Number, default: 0 },
    totalMessages: { type: Number, default: 0 },
    totalNotifications: { type: Number, default: 0 },
    totalAddresses: { type: Number, default: 0 },
    totalPayments: { type: Number, default: 0 },
    totalCart: { type: Number, default: 0 },
    totalWishlist: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
