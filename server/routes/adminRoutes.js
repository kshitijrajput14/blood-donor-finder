const express = require("express");
const router = express.Router();

const {
    createAdmin,
    loginAdmin
} = require("../controllers/adminController");

const { protectAdmin } = require("../middleware/authMiddleware");


// Public routes
router.post("/create", createAdmin);
router.post("/login", loginAdmin);


// Protected admin routes will be added here later
// Example:
// router.put("/something", protectAdmin, somethingController);


module.exports = router;