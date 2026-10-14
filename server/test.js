require("dotenv").config();

const dns = require("dns");
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ Connected");
})
.catch(console.error);