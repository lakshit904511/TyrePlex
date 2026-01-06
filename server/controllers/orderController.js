const orderService = require("../services/orderService.js");

exports.createOrder = (req, res, next) => {
  try {
    const order = orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

exports.getOrders = (req, res, next) => {
  try {
    const orders = orderService.getOrders();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.cancelOrder = (req, res, next) => {
  try {
    const order = orderService.cancelOrder(req.params.id);
    res.json(order);
  } catch (err) {
    next(err);
  }
};
