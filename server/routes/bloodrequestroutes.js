const express = require("express");
const router = express.Router();

const {
    createBloodRequest,
    getAllBloodRequests,
    getMyBloodRequests,
    patientConfirmBlood,
    updateRequestStatus,
    donorUpdateRequestStatus,
        getPublicBloodRequests
} = require("../controllers/bloodrequestcontroller");

const {
    protectAdmin,
    protectDonor,
    protectPatient
} = require("../middleware/authMiddleware");


// Blood request routes
router.post(
    "/create",
    protectPatient,
    createBloodRequest
);
router.get(
    "/all",
    protectAdmin,
    getAllBloodRequests
);

router.get(
    "/public",
    getPublicBloodRequests
);


// Only authenticated admin can change request status
router.put(
    "/update-status/:id",
    protectAdmin,
    updateRequestStatus
);
router.put(
    "/donor-status/:id",
    protectDonor,
    donorUpdateRequestStatus
);
router.get(
    "/my-requests",
    protectPatient,
    getMyBloodRequests
);

router.put(
    "/patient-confirm/:id",
    protectPatient,
    patientConfirmBlood
);

module.exports = router;