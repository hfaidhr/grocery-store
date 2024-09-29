const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/Order.Controller");

router.post("/order", OrderController.createOrder);
router.patch("/order/:orderId", OrderController.updateOrder);
router.get("/orders/user/:userId", OrderController.getOrdersByUserId);
router.delete("/orders/:orderId/cancel", OrderController.cancelOrder);

module.exports = router;
