const mongoose = require('mongoose');

const orderItemsSchema = new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "canceled", "returned", "failed"],
        default: "pending"
    }
}, { timestamps: true });

const Order_item = mongoose.model("Order_item", orderItemsSchema);
module.exports = Order_item;
