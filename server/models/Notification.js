const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        donorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Donor",
            required: true
        },

        bloodRequestId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BloodRequest",
            required: true
        },

        message: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["Unread", "Read"],
            default: "Unread"
        }
    },
    {
        timestamps: true
    }
);

const Notification = mongoose.model(
    "Notification",
    notificationSchema
);

module.exports = Notification;