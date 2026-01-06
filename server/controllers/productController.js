const productService = require("../services/productService.js");

exports.createProduct = (req, res, next) => {
  try {
    const product = productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

exports.getProducts = (req, res, next) => {
  try {
    const products = productService.getProducts(req.query);
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = (req, res, next) => {
  try {
    const product = productService.updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = (req, res, next) => {
  try {
    productService.deleteProduct(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
};
