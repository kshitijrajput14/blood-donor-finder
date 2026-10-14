const Donor = require("../models/donor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Donor
// Register Donor
const registerDonor = async (req, res) => {
    try {

        const { name, bloodGroup, city, phone ,email,password} = req.body;

        // Check normal fields
        if (!name || !bloodGroup || !city || !phone || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            });
        }

        // Check medical report
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Medical report is required"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create donor in MongoDB
        const donor = await Donor.create({

            name,
            bloodGroup,
            city,
            phone,
            
            email,
            password: hashedPassword,

            medicalReport: {
                fileName: req.file.filename,
                filePath: req.file.path
            },

            verified: false

        });

        res.status(201).json({
            success: true,
            message: "Donor registered successfully",
            donor
        });

    } catch (error) {

        console.log("REGISTER DONOR ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// DONOR LOGIN
const loginDonor = async (req, res) => {
    try {
        const { email, password } = req.body;

        const donor = await Donor.findOne({ email });

        if (!donor) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Donor must be verified
        if (donor.verificationStatus !== "Verified") {
            return res.status(403).json({
                success: false,
                message: "Your account is not verified yet"
            });
        }

        // Check password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            donor.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: donor._id,
                role: "donor"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Donor login successful",

            token,

            donor: {
                id: donor._id,
                name: donor.name,
                email: donor.email,
                bloodGroup: donor.bloodGroup,
                city: donor.city,
             phone: donor.phone
            }
        });

    } catch (error) {
        console.log("DONOR LOGIN ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
// Get All Donors
const getAllDonors = async (req, res) => {

    try {

        // Admin needs to see ALL donors
        const donors = await Donor.find();

        res.status(200).json({
            success: true,
            count: donors.length,
            donors
        });

    } catch (error) {

        console.log("GET ALL DONORS ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};

const searchDonors = async (req, res) => {

    try {

        console.log("QUERY RECEIVED:", req.query);

        const { bloodGroup, city } = req.query;

        const query = {
            verificationStatus: "Verified"
        };

        if (bloodGroup && bloodGroup.trim() !== "") {
            query.bloodGroup = {
                $regex: `^${bloodGroup.trim()}$`,
                $options: "i"
            };
        }

        if (city && city.trim() !== "") {
            query.city = {
                $regex: `^${city.trim()}$`,
                $options: "i"
            };
        }

        console.log("MONGODB QUERY:", query);

        const donors = await Donor.find(query);

        console.log("DONORS FOUND:", donors);

        res.status(200).json({
            success: true,
            donors
        });

    } catch (error) {

        console.log("SEARCH ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
    const deleteDonor = async(req,res)=>{
         console.log("DELETE API CALLED");
    console.log("ID:", req.params.id);
        try{
            const{id}= req.params;
            const donor = await Donor.findByIdAndDelete(id);
            if(!donor){
                return res.status(404).json({
                    sucess:false,
                    message:"donors not found"
                });
            }
            res.status(200).json({
                sucess:true,
                message:"donor deleted successfully",
                donor
            });

        }catch(error){
            console.log(error);
            res.status(500).json({
                success:false,
                mesage:"server error"
            });
        }

    };

    const updateDonor = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, bloodGroup, city, phone } = req.body;

        const donor = await Donor.findByIdAndUpdate(
            id,
            {
                name,
                bloodGroup,
                city,
                phone
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!donor) {
            return res.status(404).json({
                success: false,
                message: "Donor not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Donor updated successfully",
            donor
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
const getDonorById = async (req, res) => {

    try {

        const { id } = req.params;

        const donor = await Donor.findById(id);

        if (!donor) {
            return res.status(404).json({
                success: false,
                message: "Donor not found"
            });
        }

        res.status(200).json({
            success: true,
            donor
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }
};

const findMatchingDonors = async (req, res) => {

    try {

        const { bloodGroup, city } = req.query;

        console.log("MATCHING DONOR REQUEST:");
        console.log("Blood Group:", bloodGroup);
        console.log("City:", city);

        if (!bloodGroup || !city) {
            return res.status(400).json({
                success: false,
                message: "Blood group and city are required"
            });
        }

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

        res.status(200).json({
            success: true,
            count: donors.length,
            donors
        });

    } catch (error) {

        console.log("MATCHING DONOR ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
const verifyDonor = async (req, res) => {

    try {

        const { id } = req.params;

        const donor = await Donor.findByIdAndUpdate(
            id,
            {
                verified: true,
                verificationStatus: "Verified"
            },
            {
                new: true
            }
        );

        if (!donor) {
            return res.status(404).json({
                success: false,
                message: "Donor not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Donor verified successfully",
            donor
        });

    } catch (error) {

        console.log("VERIFY DONOR ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }
};

const rejectDonor = async (req, res) => {

    try {

        const { id } = req.params;

        const donor = await Donor.findByIdAndUpdate(
            id,
            {
                verified: false,
                verificationStatus: "Rejected"
            },
            {
                new: true
            }
        );

        if (!donor) {
            return res.status(404).json({
                success: false,
                message: "Donor not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Donor rejected successfully",
            donor
        });

    } catch (error) {

        console.log("REJECT DONOR ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }
};
const getVerifiedDonors = async (req, res) => {
    try {

        const allDonors = await Donor.find({});

        console.log("========== PUBLIC DONOR DEBUG ==========");
        console.log("TOTAL DONORS:", allDonors.length);

        allDonors.forEach((donor) => {
            console.log(
                donor.name,
                "| verificationStatus:",
                donor.verificationStatus,
                "| verified:",
                donor.verified
            );
        });

        const donors = await Donor.find({
            verificationStatus: "Verified"
        });

        console.log("VERIFIED DONORS:", donors.length);
        console.log("========================================");

        res.status(200).json({
            success: true,
            count: donors.length,
            donors
        });

    } catch (error) {

        console.log("GET VERIFIED DONORS ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }
};
module.exports = {
    registerDonor,
    loginDonor,
    getAllDonors,
    getVerifiedDonors,
    searchDonors,
    deleteDonor,
    updateDonor,
    getDonorById,
    findMatchingDonors,
    verifyDonor,
    rejectDonor
};