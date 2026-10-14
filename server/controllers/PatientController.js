const Patient = require("../models/Patient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerPatient = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        const existingPatient = await Patient.findOne({ email });

        if (existingPatient) {
            return res.status(400).json({
                success: false,
                message: "Patient already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const patient = await Patient.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "Patient registered successfully",
            patient: {
                id: patient._id,
                name: patient.name,
                email: patient.email
            }
        });

    } catch (error) {
        console.log("PATIENT REGISTER ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const loginPatient = async (req, res) => {
    try {
        const { email, password } = req.body;

        const patient = await Patient.findOne({ email });

        if (!patient) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            patient.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: patient._id,
                role: "patient"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Patient login successful",
            token,
            patient: {
                id: patient._id,
                name: patient.name,
                email: patient.email
            }
        });

    } catch (error) {
        console.log("PATIENT LOGIN ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    registerPatient,
    loginPatient
};