const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const errorMidleware = require("./middleware/errorMidleware.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.use(errorMidleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
