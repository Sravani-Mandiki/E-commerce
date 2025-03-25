const Order = require("../models/orders");

exports.placeOrder = async (req, res) => {
    try {
        const { total_amount, status } = req.body; 

        if (!total_amount) {
            return res.status(400).json({ message: "total_amount is required" });
        }

        const order = new Order({ user_id: req.user.id, total_amount, status: status || "pending" });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user_id: req.user.id }); 
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);
    res.json(order);
};

exports.cancelOrder = async (req, res) => {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order cancelled" });
};
