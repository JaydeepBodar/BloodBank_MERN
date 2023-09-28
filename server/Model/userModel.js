const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      enum: ["Donor", "Admin", "Hospital", "Organization"],
    },
    organizationName: {
      type: String,
      required: () => {
        if (this.role === "Organization") {
          return true;
        } else {
          return false
        }
      },
    },
    bloodgroup:{
      type:String,
      required:()=>{
        if(this.role === "Donor"){
          return true;
        }else{
          return false
        }
      }
    },
    hospitalName: {
      type: String,
      required: () => {
        if (this.role === "Hospital") {
          return true;
        } else {
          return null;
        }
      },
    },
    name: {
      type: String,
      required:()=>{
        if(this.role === "Donor"){
          return true;
        }else if(this.role === "Admin"){
          return true;
        }
        else{
          return null
        }
      },
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: ()=>{
        if(this.role === "Hospital"){
          return true
        }else if(this.role==="Organization"){
          return true
        }else{
          return null
        }
      },
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
