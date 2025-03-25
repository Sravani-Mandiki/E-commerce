const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");

exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try { 
        const { username, email, password, address } = req.body;

        if (!username || !email || !password || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = new User({ username, email, password, address});
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error in registerUser:", error.message, error.stack);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
    
};

exports.loginUser = async (req, res) => {
    try {
        console.log("🔹 Login endpoint hit");
        console.log("🔹 Received data:", req.body);

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found with this email:", email);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        console.log("🔹 Found user:", user);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password does not match");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" }); 
        res.json({ token });

    } catch (error) {
        console.error("Error in loginUser:", error.message, error.stack);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


exports.getUserProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized - No user found" });
        }

        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.updateUserProfile = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
};
