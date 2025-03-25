const express = require("express");
const { placeOrder, getOrders, getOrder, cancelOrder } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/", protect, getOrders);
router.get("/:id", protect, getOrder);
router.delete("/:id", protect, cancelOrder);

module.exports = router;
