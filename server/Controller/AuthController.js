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
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      res.status(201).json({ message: "User Alreday exist in Our System" });
    } else {
      const encryptpassword = await bcrypt.hash(password, 10);
      const user = await userModel.create({
        name,
        email,
        organizationName,
        role,
        website,
        address,
        password: encryptpassword,
        hospitalName,
      });
      res.status(200).json({ user, message: "Succsessfully Register" });
    }
  } catch (e) {
    res.status(400).json({ message: "Internal Server error" });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user=await userModel.findOne({email:email})
  if(!user){
    res.status(201).json({message:"Email id not Register Our System"})
  }else{
    const comparepassword=await bcrypt.compare(password,user.password)
    if(!comparepassword){
      res.status(401).json({message:"Wrong Password try again"})
    }else{
      const token=jwt.sign({userId:user._id},process.env.SECERETKEY,{expiresIn:'2H'})
      console.log("usertoken")
      res.status(200).json({user,token,message:"user login succsessfully"})
    }
  }
};
const getUser=async(req,res)=>{
  const user=await userModel.find()
  res.json(user)
}
module.exports = {
  registerUser,
  loginUser,
  getUser
};
