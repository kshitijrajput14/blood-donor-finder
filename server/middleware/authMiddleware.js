const jwt = require("jsonwebtoken");

const protectAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Admin authentication required"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (decoded.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin access denied"
            });
        }

        req.admin = decoded;

        next();

    } catch (error) {
        console.log("AUTH ERROR:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

const protectDonor = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Donor authentication required"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (decoded.role !== "donor") {
            return res.status(403).json({
                success: false,
                message: "Donor access denied"
            });
        }

        req.donor = decoded;

        next();

    } catch (error) {
        console.log("DONOR AUTH ERROR:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired donor token"
        });
    }
};

const protectPatient = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Patient authentication required"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (decoded.role !== "patient") {
            return res.status(403).json({
                success: false,
                message: "Patient access denied"
            });
        }

        req.patient = decoded;

        next();

    } catch (error) {
        console.log("PATIENT AUTH ERROR:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired patient token"
        });
    }
};
module.exports = {
    protectAdmin,
    protectDonor,
    protectPatient
};