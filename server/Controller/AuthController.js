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
    bloodgroup  
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
        data = { name, email, password:encryptpassword, role, address,bloodgroup };
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
    res.status(401).json({ message: "Email id not Register Our System" });
  } else {
    const comparepassword = await bcrypt.compare(password, user.password);
    if (!comparepassword) {
      res.status(405).json({ message: "Wrong Password try again" });
    } else if (user.role !== role) {
      res
        .status(403)
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
  const user = await userModel.find({_id:req.user._id}).sort({ createdAt: -1 })
  res.json(user);
};
const getDonor=async(req,res)=>{
  const donor=await userModel.find({role:"Donor"}).sort({ createdAt: -1 })
  if(!donor){
    res.status(205).json({message: "User not found"})
  }
  res.status(200).json({donor})
}
const getSingleuser=async(req,res)=>{
  const singledonor=await userModel.findById({_id:req.params.id}).sort({ createdAt: -1 })
  if(!singledonor){
    res.status(205).json({message: "User not found"})
  }
  res.status(200).json({singledonor})
}
const getOrganization=async(req,res)=>{
  try{
    const Organization=await userModel.find({role:"Organization"}).sort({ createdAt: -1 })
    res.status(200).json({Organization})
  }catch(e){
    res.status(500).json({message : "Internal server error"})
  }
}
const getHospital=async(req,res)=>{
  try{
    const hospital=await userModel.find({role:"Hospital"}).sort({ createdAt: -1 })
    res.status(200).json({hospital})
  }catch(e){
    res.status(500).json({message : "Internal server error"})
  }
}
const deleteSingleuser=async(req,res)=>{
  try{
    const deleteuser=await userModel.findByIdAndDelete({_id:req.params.id})
    res.status(200).json({message:"Succsessfully delete record"})
  }catch(e){
    res.status(500).json({message : "Internal server error"})
  }
}
module.exports = {
  registerUser,
  loginUser,
  getUser,
  getDonor,
  getSingleuser,
  getOrganization,
  getHospital,
  deleteSingleuser
};
