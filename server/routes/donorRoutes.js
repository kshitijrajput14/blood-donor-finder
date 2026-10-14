const express = require("express");

const upload = require("../config/upload");
const router = express.Router();


const{
    
    registerDonor,
    loginDonor,
    getAllDonors,
     getVerifiedDonors,
     getDonorById,
    searchDonors,
    findMatchingDonors,
    deleteDonor,
    updateDonor,
    verifyDonor,
    rejectDonor
    
}= require("../controllers/donorcontroller");
const { protectAdmin, protectDonor } = require("../middleware/authMiddleware");



router.post(
    "/register",
    upload.single("medicalReport"),
    registerDonor
);

router.post(
    "/login",
    loginDonor
);

router.get(
    "/search",
    searchDonors
);

router.get(
    "/matching",
    findMatchingDonors
);

router.get(
    "/verified",
    getVerifiedDonors
);

router.get(
    "/all",
    protectAdmin,
    getAllDonors
);

router.put(
    "/verify/:id",
    protectAdmin,
    verifyDonor
);

router.put(
    "/reject/:id",
    protectAdmin,
    rejectDonor
);

router.delete(
    "/delete/:id",
    protectAdmin,
    deleteDonor
);

router.put(
    "/update/:id",
    protectDonor,
    updateDonor
);

/* THIS MUST BE LAST */
router.get(
    "/:id",
    getDonorById
);

module.exports = router;