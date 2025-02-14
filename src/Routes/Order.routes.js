const {
    createOrder,
    getAllOrders,
    getUserOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
} = require("../Controllers/Order/Order.controller");
const express = require("express");
const accessControl = require("../Middleware/AccessControle.middleware");

const router = express.Router();

router.post("/create",accessControl(["Patient"]), createOrder);
router.get("/get-all",accessControl(["admin"]), getAllOrders);
router.get("/get-by-user",accessControl(["admin","Patient"]), getUserOrders);
router.get("/get-by-order-id/:orderId",accessControl(["admin","Patient"]), getOrderById);
router.patch("/update-status/:orderId",accessControl(["admin"]), updateOrderStatus);
router.delete("/delete/:orderId",accessControl(["admin"]), deleteOrder);

module.exports = router;