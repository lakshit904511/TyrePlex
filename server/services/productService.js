const path = require("path");
const { readJSON, writeJSON } = require("../utils/fileHandler");

const productsFilePath = path.join(__dirname, "../data/products.json");

exports.createProduct = (data) => {
  const products = readJSON(productsFilePath);

  const { name, sku, price, stock } = data;

  if (!name || name.length < 3) {
    throw { status: 400, message: "Name must be at least 3 characters" };
  }

  if (!sku) {
    throw { status: 400, message: "SKU is required" };
  }

  if (typeof price !== "number" || price <= 0) {
    throw { status: 400, message: "Price must be greater than 0" };
  }

  if (typeof stock !== "number" || stock < 0) {
    throw { status: 400, message: "Stock must be 0 or more" };
  }

  const skuExists = products.find((p) => p.sku === sku);
  if (skuExists) {
    throw { status: 400, message: "SKU must be unique" };
  }

  const newProduct = {
    id: Date.now().toString(),
    name,
    sku,
    price,
    stock,
    createdAt: new Date(),
  };

  products.push(newProduct);
  writeJSON(productsFilePath, products);

  return newProduct;
};

exports.getProducts = (query) => {
  let products = readJSON(productsFilePath);
  const { search, minStock } = query;

  if (search) {
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (minStock !== undefined) {
    products = products.filter((p) => p.stock >= Number(minStock));
  }

  return products;
};


exports.updateProduct = (id, data) => {
  const products = readJSON(productsFilePath);
  console.log(data,id,products);
  const product = products.find((p) => p.id === id);

  if (!product) {
    throw { status: 404, message: "Product not found" };
  }

  const { name, price, stock } = data;

  if (name !== undefined && name.length < 3) {
    throw { status: 400, message: "Name must be at least 3 characters" };
  }

  if (price !== undefined && (typeof price !== "number" || price <= 0)) {
    throw { status: 400, message: "Price must be greater than 0" };
  }

  if (stock !== undefined && (typeof stock !== "number" || stock < 0)) {
    throw { status: 400, message: "Stock must be 0 or more" };
  }

  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;
  if (stock !== undefined) product.stock = stock;

  writeJSON(productsFilePath, products);
  return product;
};


exports.deleteProduct = (id) => {
  const products = readJSON(productsFilePath);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    throw { status: 404, message: "Product not found" };
  }

  products.splice(index, 1);
  writeJSON(productsFilePath, products);
};
