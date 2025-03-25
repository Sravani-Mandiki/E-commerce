const express = require("express");
const { registerUser, loginUser,getUserById , getUserProfile, updateUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
const { check } = require("express-validator");

router.post("/register", [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
    check("address", "Address is required").not().isEmpty()
], registerUser);

router.post("/login", [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").not().isEmpty()
], loginUser);

router.get("/profile",protect, getUserProfile);


router.get("/:id", protect, async (req, res) => { 
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});


router.put("/:id", protect, updateUserProfile);

module.exports = router;
