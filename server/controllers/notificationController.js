const Notification = require("../models/Notification");
const Donor = require("../models/donor");


// ==========================================
// GET DONOR NOTIFICATIONS
// ==========================================

const getDonorNotifications = async (req, res) => {
    try {
      const donorId = req.donor.id;

        // Get current donor
        const donor = await Donor.findById(donorId);

        if (!donor) {
            return res.status(404).json({
                success: false,
                message: "Donor not found"
            });
        }

        console.log("CURRENT DONOR BLOOD GROUP:", donor.bloodGroup);
        console.log("CURRENT DONOR CITY:", donor.city);

        // Get notifications
        const allNotifications = await Notification.find({
            donorId: donorId
        })
            .populate("bloodRequestId")
            .sort({ createdAt: -1 });

        console.log("TOTAL NOTIFICATIONS:", allNotifications.length);

        // Filter notifications
        const notifications = allNotifications.filter((notification) => {

            const request = notification.bloodRequestId;

            if (!request) {
                return false;
            }

            console.log(
                "CHECKING REQUEST:",
                request.bloodGroup,
                request.city
            );

            const donorBloodGroup =
                String(donor.bloodGroup).trim().toLowerCase();

            const donorCity =
                String(donor.city).trim().toLowerCase();

            const requestBloodGroup =
                String(request.bloodGroup).trim().toLowerCase();

            const requestCity =
                String(request.city).trim().toLowerCase();

            const isBloodGroupMatch =
                donorBloodGroup === requestBloodGroup;

            const isCityMatch =
                donorCity === requestCity;

            console.log(
                "BLOOD MATCH:",
                isBloodGroupMatch
            );

            console.log(
                "CITY MATCH:",
                isCityMatch
            );

            return isBloodGroupMatch && isCityMatch;
        });

        console.log(
            "FINAL NOTIFICATIONS:",
            notifications.length
        );

        res.status(200).json({
            success: true,
            count: notifications.length,
            notifications
        });

    } catch (error) {
        console.log("NOTIFICATION ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};



// ==========================================
// MARK NOTIFICATION AS READ
// ==========================================

const markNotificationAsRead = async (req, res) => {

    try {

        const { notificationId } = req.params;


        const notification = await Notification.findOneAndUpdate(
    {
        _id: notificationId,
        donorId: req.donor.id
    },
    {
        status: "Read"
    },
    {
        new: true
    }
);

        if (!notification) {

            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });

        }


        res.status(200).json({

            success: true,

            message: "Notification marked as read",

            notification

        });


    } catch (error) {

        console.log("MARK READ ERROR:", error);

        res.status(500).json({

            success: false,

            message: "Server error"

        });

    }

};



// ==========================================
// EXPORT FUNCTIONS
// ==========================================

module.exports = {

    getDonorNotifications,

    markNotificationAsRead

};