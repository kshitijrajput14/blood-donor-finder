const BloodRequest = require("../models/bloodRequest");
const Notification = require("../models/Notification");
const Donor = require("../models/donor");


// CREATE BLOOD REQUEST
// CREATE BLOOD REQUEST
const createBloodRequest = async (req, res) => {
    try {

        // Get logged-in patient's ID
        const patientId = req.patient.id;

        const {
            patientName,
            bloodGroup,
            city,
            phone,
            hospital
        } = req.body;


        console.log("========== BLOOD REQUEST BODY ==========");
        console.log(req.body);
        console.log("PATIENT ID:", patientId);
        console.log("phone:", phone);
        console.log("hospital:", hospital);
        console.log("========================================");


        const newRequest = await BloodRequest.create({
            patientId,
            patientName,
            bloodGroup,
            city,
            phone,
            hospital
        });


        const donors = await Donor.find({
            verificationStatus: "Verified",

            bloodGroup: {
                $regex: `^${bloodGroup.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`,
                $options: "i"
            },

            city: {
                $regex: `^${city.trim()}$`,
                $options: "i"
            }
        });


        console.log(
            "MATCHING DONORS:",
            donors.length
        );


        const notifications = donors.map((donor) => ({
            donorId: donor._id,
            bloodRequestId: newRequest._id,

            message: `🚨 Emergency blood request: ${bloodGroup} blood is required in ${city}.`,

            status: "Unread"
        }));


        if (notifications.length > 0) {

            await Notification.insertMany(
                notifications
            );

            console.log(
                "NOTIFICATIONS CREATED:",
                notifications.length
            );

        } else {

            console.log(
                "NO MATCHING VERIFIED DONORS"
            );

        }


        res.status(201).json({
            success: true,

            message:
                "Blood request created successfully",

            request: newRequest,

            matchingDonors: donors.length
        });


    } catch (error) {

        console.log(
            "CREATE REQUEST ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
// GET ALL BLOOD REQUESTS
const getAllBloodRequests = async (req, res) => {

    try {

        const requests = await BloodRequest.find();

        res.status(200).json({
            success: true,
            requests
        });

    } catch (error) {

        console.log("GET REQUEST ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }
};

const getMyBloodRequests = async (req, res) => {
    try {

        const requests = await BloodRequest.find({
            patientId: req.patient.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            requests
        });

    } catch (error) {

        console.log("GET MY REQUESTS ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const patientConfirmBlood = async (req, res) => {
    try {

        const { id } = req.params;

        const request = await BloodRequest.findOne({
            _id: id,
            patientId: req.patient.id
        });

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Blood request not found or not authorized"
            });
        }

        if (request.status !== "Accepted") {
            return res.status(400).json({
                success: false,
                message: "Blood can only be confirmed after donor accepts the request"
            });
        }

        request.status = "Fulfilled";

        await request.save();

        res.status(200).json({
            success: true,
            message: "Blood received confirmed successfully",
            request
        });

    } catch (error) {

        console.log(
            "PATIENT CONFIRM BLOOD ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
//function for updating the status of bloodrequests

const updateRequestStatus = async (req, res) => {

    console.log("========== UPDATE STATUS API CALLED ==========");

    try {

        const { id } = req.params;
        const { status } = req.body;

        console.log("ID:", id);
        console.log("STATUS:", status);


        const request = await BloodRequest.findById(id);

        if (!request) {

            return res.status(404).json({
                success: false,
                message: "Blood request not found"
            });

        }


        // Admin can ONLY change Pending → Accepted

        if (
            request.status === "Pending" &&
            status === "Accepted"
        ) {

            request.status = "Accepted";

        } else {

            return res.status(400).json({
                success: false,
                message:
                    `Invalid status transition: ${request.status} → ${status}`
            });

        }


        await request.save();


        console.log(
            "UPDATED REQUEST:",
            request
        );


        res.status(200).json({
            success: true,
            message: "Request status updated successfully",
            request
        });


    } catch (error) {

        console.log(
            "========== STATUS UPDATE ERROR =========="
        );

        console.log(error);


        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }
};
const donorUpdateRequestStatus = async (req, res) => {

    console.log("========== DONOR STATUS API CALLED ==========");

    try {

        const { id } = req.params;
        const { status } = req.body;

        // Only donor can use this function
        if (status !== "Accepted" && status !== "Rejected") {

            return res.status(400).json({
                success: false,
                message: "Donor can only accept or reject a request"
            });

        }

        console.log("REQUEST ID:", id);
        console.log("DONOR ID:", req.donor.id);
        console.log("STATUS:", status);

        const notification = await Notification.findOne({
    donorId: req.donor.id,
    bloodRequestId: id
});

if (!notification) {
    return res.status(403).json({
        success: false,
        message: "You are not authorized to respond to this request"
    });
}


        const request = await BloodRequest.findById(id);

        if (!request) {

            return res.status(404).json({
                success: false,
                message: "Blood request not found"
            });

        }


        // Request must still be pending
        if (request.status !== "Pending") {

            return res.status(400).json({
                success: false,
                message: "This request is no longer pending"
            });

        }


        request.status = status;

        await request.save();


        console.log("DONOR UPDATED REQUEST:", request);


        res.status(200).json({

            success: true,

            message: `Request ${status.toLowerCase()} successfully`,

            request

        });

    } catch (error) {

        console.log("DONOR STATUS ERROR:", error);

        res.status(500).json({

            success: false,

            message: "Server error"

        });

    }
};

const getPublicBloodRequests = async (req, res) => {
    try {

        const requests = await BloodRequest.find({
            status: {
                $in: ["Pending", "Accepted"]
            }
        }).sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            count: requests.length,
            requests
        });

    } catch (error) {

        console.log(
            "GET PUBLIC BLOOD REQUESTS ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }
};

module.exports = {
    createBloodRequest,
    getAllBloodRequests,
    getMyBloodRequests,
    patientConfirmBlood,
    updateRequestStatus,
    donorUpdateRequestStatus,
    getPublicBloodRequests
};