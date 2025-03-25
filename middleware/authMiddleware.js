const jwt = require("jsonwebtoken");
const User = require("../models/users.js");
require("dotenv").config();


const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]; 
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET); 
            req.user = await User.findById(decoded.id).select("-password"); 
            
            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }

            next(); 
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    } else {
        return res.status(401).json({ message: "No token provided" });
    }
};


const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Forbidden: Admins only" });
    }
};

module.exports = { protect, isAdmin };
