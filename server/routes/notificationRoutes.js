const express = require("express");

const router = express.Router();

const {
    getDonorNotifications,
    markNotificationAsRead
} = require("../controllers/notificationController");

const { protectDonor } = require("../middleware/authMiddleware");

router.get(
    "/donor/:donorId",
    protectDonor,
    getDonorNotifications
);

router.put(
    "/read/:notificationId",
    protectDonor,
    markNotificationAsRead
);

module.exports = router;