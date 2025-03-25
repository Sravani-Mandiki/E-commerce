const express = require("express");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const { getProducts, getProduct, addProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const { check } = require("express-validator");

const router = express.Router();

// Get all products
router.get("/", getProducts);

// Get a single product
router.get("/:id", getProduct);

// Create a new product (Admin only)
router.post(
    "/",
    protect,
    isAdmin,
    [
        check("name", "Product name is required").not().isEmpty(),
        check("description", "Description is required").not().isEmpty(),
        check("price", "Price should be a number").isNumeric(),
        check("stock", "Stock should be a number").isInt({ min: 0 }),
    ],
    addProduct
);

// Update product (Admin only)
router.put(
    "/:id",
    protect,
    isAdmin,
    [
        check("name", "Product name is required").optional().not().isEmpty(),
        check("price", "Price should be a number").optional().isNumeric(),
        check("stock", "Stock should be a number").optional().isInt({ min: 0 }),
    ],
    updateProduct
);

// Delete product (Admin only)
router.delete("/:id", protect, isAdmin, deleteProduct);

module.exports = router;
