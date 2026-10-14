const dns = require("dns");

// Force Node.js to use Cloudflare DNS instead of 127.0.0.1
dns.setServers(["1.1.1.1", "1.0.0.1"]);
const express = require("express");
const cors = require("cors");

const app = express();
const path = require("path");
app.use(cors());

app.use(express.json());
require("dotenv").config();
const connectDB = require("./config/db");

const adminRoutes = require("./routes/adminRoutes");

const donorRoutes = require("./routes/donorRoutes");
const bloodRequestRoutes = require("./routes/bloodRequestRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const patientRoutes = require("./routes/patientRoutes");



connectDB();//connect mongoDB to project


// Medical Report Route
app.get("/uploads/:filename", (req, res) => {

    const filePath = path.join(
        __dirname,
        "uploads",
        req.params.filename
    );

    res.type("application/pdf");

    res.sendFile(filePath, (error) => {

        if (error) {

            console.log("REPORT ERROR:", error);

            if (!res.headersSent) {

                res.status(404).json({
                    success: false,
                    message: "Medical report not found"
                });

            }

        }

    });

});



app.use("/api/donor", donorRoutes);
app.use("/api/blood-request", bloodRequestRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/patient", patientRoutes);

const PORT = 5000;

app.get("/",(req,res)=>{
    res.send("welcome to blood donor finder")
});


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});