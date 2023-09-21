const mongoose = require("mongoose");
const usermodel=require('./userModel')
console.log("usermodelusermodel",usermodel)
const inventorySchema = mongoose.Schema(
  {
    inventoryType: {
      type: String,
      require: [true, "Inventory is Required"],
      enum: ["in", "out"],
    },
    bloodgroup: {
      type: String,
      required: [true, "bloodgroup is required"],
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
		Quantity:{
			type:Number,
			required:[true,"Quantity is Required"]
		},
    Organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    Hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return usermodel?.role === "Organization";
      },
    },
    Donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return usermodel?.role === "Donor";
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Inventorymodel", inventorySchema);
