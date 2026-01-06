const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController.js");

router.post("/", orderController.createOrder);
router.get("/", orderController.getOrders);
router.put("/:id/cancel", orderController.cancelOrder);

module.exports = router;
