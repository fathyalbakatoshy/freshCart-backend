const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const productRoute = require("./routes/product.route");
const categoriesRoute = require("./routes/categories.route");
const cartRoute = require('./routes/cart.route');
const adminRoutes = require("./routes/adminRoutes");
const cors = require('cors');
require('dotenv').config();





app.use(express.json());
app.use(cors());

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/cart', cartRoute);
app.use("/api/admin", adminRoutes);



app.get("/", (req, res) => {res.send("Hello From Node Server")});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log("Error connecting to MongoDB:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
