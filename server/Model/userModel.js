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
        if (this.role === "Organization") {1
          return true;
        } else {
          return false;
        }
      },
    },
    hospitalName: {
      type: String,
      required: () => {
        if (this.role === "Hospital") {
          return true;
        } else {
          return false;
        }
      },
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
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
