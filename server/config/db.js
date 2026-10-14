const mongoose = require("mongoose");

const connectDB = async () => {
    try {

        console.log("Trying MongoDB...");

        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            family: 4
        });

        console.log("✅ MongoDB Connected Successfully");

    } catch (error) {

        console.log("========== CONNECTION ERROR ==========");
        console.log("Name:", error.name);
        console.log("Message:", error.message);

        console.log("\n========== CAUSE ==========");
        console.log(error.cause);

        console.log("\n========== REASON ==========");
        console.log(error.reason);

        console.log("======================================");

        process.exit(1);
    }
};

module.exports = connectDB;