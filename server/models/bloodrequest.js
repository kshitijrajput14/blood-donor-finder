

const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
    {

        patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
},
        patientName: {
            type: String,
            required: true
        },

        bloodGroup: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        hospital: {
            type: String,
            required: true
        },

        status: {
            type: String,
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

const BloodRequest = mongoose.model(
    "BloodRequest",
    bloodRequestSchema
);

module.exports = BloodRequest;