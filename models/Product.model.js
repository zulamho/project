const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: String,
    price: Number,
    pathImages: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
