const path = require("path");
const { readJSON, writeJSON } = require("../utils/fileHandler");

const productsFilePath = path.join(__dirname, "../data/products.json");
const ordersFilePath = path.join(__dirname, "../data/orders.json");


exports.createOrder = (data) => {
  const { customerName, items } = data;

  if (!customerName || customerName.trim().length === 0) {
    throw { status: 400, message: "Customer name is required" };
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw { status: 400, message: "Order items are required" };
  }

  const products = readJSON(productsFilePath);
  const orders = readJSON(ordersFilePath);

  let totalAmount = 0;

  for (const item of items) {
    const { productId, qty } = item;

    if (!productId || typeof qty !== "number" || qty <= 0) {
      throw { status: 400, message: "Invalid order item" };
    }

    const product = products.find((p) => p.id === productId);
    if (!product) {
      throw { status: 404, message: "Product not found" };
    }

    if (product.stock < qty) {
      throw {
        status: 400,
        message: `Insufficient stock for product ${product.name}`,
      };
    }
  }

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    product.stock -= item.qty;
    totalAmount += product.price * item.qty;
  }

  const newOrder = {
    id: Date.now().toString(),
    customerName,
    items,
    status: "created",
    totalAmount,
    createdAt: new Date(),
  };

  orders.push(newOrder);

  writeJSON(productsFilePath, products);
  writeJSON(ordersFilePath, orders);

  return newOrder;
};


exports.getOrders = () => {
  return readJSON(ordersFilePath);
};


exports.cancelOrder = (orderId) => {
  const products = readJSON(productsFilePath);
  const orders = readJSON(ordersFilePath);

  const order = orders.find((o) => o.id === orderId);
  if (!order) {
    throw { status: 404, message: "Order not found" };
  }

  if (order.status === "cancelled") {
    throw { status: 400, message: "Order already cancelled" };
  }

  for (const item of order.items) {
    const product = products.find((p) => p.id === item.productId);
    if (product) {
      product.stock += item.qty;
    }
  }

  order.status = "cancelled";

  writeJSON(productsFilePath, products);
  writeJSON(ordersFilePath, orders);

  return order;
};
