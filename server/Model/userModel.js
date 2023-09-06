const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      require: true,
      enum: ["User", "Admin", "Hospital", "Organization"],
    },
    organizationName: {
      type: String,
      require: () => {
        if (this.role === "Organization") {
          return true;
        } else {
          return false;
        }
      },
    },
    hospitalName: {
      type: String,
      require: () => {
        if (this.role === "Hospital") {
          return true;
        } else {
          return false;
        }
      },
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    website: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
