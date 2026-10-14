const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// CREATE ADMIN
const createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "Admin created successfully"
        });

    } catch (error) {
        console.log("ADMIN CREATE ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create admin"
        });
    }
};


// ADMIN LOGIN
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        let isPasswordCorrect = false;

        // Check if password is already bcrypt hashed
        if (
            admin.password.startsWith("$2a$") ||
            admin.password.startsWith("$2b$") ||
            admin.password.startsWith("$2y$")
        ) {
            isPasswordCorrect = await bcrypt.compare(
                password,
                admin.password
            );
        } 
        
        // Old admin password was stored as plain text
        else {
            if (admin.password === password) {
                isPasswordCorrect = true;

                // Convert old password to bcrypt hash
                admin.password = await bcrypt.hash(password, 10);
                await admin.save();

                console.log("ADMIN PASSWORD MIGRATED TO BCRYPT");
            }
        }

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                id: admin._id,
                role: "admin"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Admin login successful",
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email
            }
        });

    } catch (error) {
        console.log("ADMIN LOGIN ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    createAdmin,
    loginAdmin
};