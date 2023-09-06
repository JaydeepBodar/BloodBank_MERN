const inventoryModel = require("../Model/inventoryModel");
const userModel = require("../Model/userModel");
const createInventory = async (req, res) => {
try{
	const { inventoryType, email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
      throw new Error("User not found")
  }
	if(inventoryType === 'in' && user.role !== "Donor"){
		throw new Error("Your role is not Donor So you can not use this features")
	}
	if(inventoryType === 'out' && user.role !== "Hospital"){
		throw new Error("Your role is not Hospital So you can not use this features")
	}
	const inventory=await inventoryModel.create(req.body)
	console.log("inventory",inventory)
	res.status(200).json({message:"Succsessfully add Blood Record"})
}catch(e){
	res.status(400).json({message:"Your Record is not added"})
}
};
const getInventory=async(req,res)=>{
	try{
		const user=await inventoryModel.findOne({Organization:req.user.userId})
		// console.log("user",user)
		res.status(200).json(user)
	}catch(e){
		res.status(400).json({message:"Not get Inventorey"})
	}
}
module.exports = { createInventory,getInventory };
