const userModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const registerUser = async (req, res) => {
  const {
    name,
    email,
    organizationName,
    role,
    website,
    address,
    password,
    hospitalName,
  } = req.body;
  // try {
  const existingUser = await userModel.findOne({ email: email });
  const encryptpassword = await bcrypt.hash(password, 10);
  if (existingUser) {
    res.status(400).json({ message: "User Alreday exist in Our System" });
  } else {
    let data;
    switch (role) {
      case "Donor":
        data = { name, email, password:encryptpassword, role, address };
        break;
      case "Organization":
        data = { email, password:encryptpassword, role, address, website, organizationName };
        break;
      case "Admin":
        data = { name, email, password:encryptpassword, role, address };
        break;
      case "Hospital":
        data = { hospitalName, website, email, password:encryptpassword, role, address };
        break;
      default:
        return;
    }
    // console.log("dfggysdygddysdydddsdd",data)
    const user = await userModel.create(data);
    const token=jwt.sign({userId:user._id},process.env.SECERETKEY,{
      expiresIn:"2H"
    })
    res.status(200).json({ user,token, message: "Succsessfully Register" });
  }
  // } catch (e) {
  //   res.status(400).json({ message: "Internal Server error" });
  // }
};
const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  const user = await userModel.findOne({ email: email });
  if (!user) {
    res.status(201).json({ message: "Email id not Register Our System" });
  } else {
    const comparepassword = await bcrypt.compare(password, user.password);
    if (!comparepassword) {
      res.status(401).json({ message: "Wrong Password try again" });
    } else if (user.role !== role) {
      res
        .status(203)
        .json({ message: "Your Role is not matched in Our System" });
    } else {
      const token = jwt.sign({ userId: user._id }, process.env.SECERETKEY, {
        expiresIn: "2H",
      });
      // console.log("usertoken")
      res
        .status(200)
        .json({ user, token, message: "user login succsessfully" });
    }
  }
};
const getUser = async (req, res) => {
  const user = await userModel.find({_id:req.user._id});
  res.json(user);
};
module.exports = {
  registerUser,
  loginUser,
  getUser,
};
