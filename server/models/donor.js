const mongoose=require("mongoose");
console.log("✅ Donor model loaded");
    const donorSchema = new mongoose.Schema(   //creates a blueprint of a donor
        {
            name:{
                type:String,
                required:true,//means this field cannot be empty
                trim:true//suppose someone writes "rahul"it automatically becomes rahul
            },

            bloodGroup:{
                type:String,
                required:true
            },

            city:{
                type:String,
                required:true
            },

            phone:{
                type:String,
                required:true
            },

            email: {
                        type: String,
                        required: true,
                        unique: true,
                        trim: true,
                        lowercase: true
                    },

                    password: {
                        type: String,
                        required: true
                    },

            verified: {
                type: Boolean,
                default: false
            },


            medicalReport: {
                fileName: {
                    type: String,
                    required: true
                },
                filePath: {
                    type: String,
                    required: true
                }
                },

                verified: {
                  type: Boolean,
                default: false
                },

                 verificationStatus: {
                    type: String,
                    enum: ["Pending", "Verified", "Rejected"],
                    default: "Pending"
                }

            
        },
        {
        timestamps:true
    
});
module.exports = mongoose.model("donor",donorSchema);//creates a collection named "DONOR" inside mongodb