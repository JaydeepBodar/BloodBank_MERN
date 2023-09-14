const { default: mongoose } = require("mongoose");
const monggose = require("mongoose");
const inventoryModel = require("../Model/inventoryModel");
const userModel = require("../Model/userModel");
const createInventory = async (req, res) => {
  // try {
    console.log("gggggggggg",new monggose.Types.ObjectId(req.body.userId))
    const { inventoryType, email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    if (inventoryType === "in" && user.role !== "Donor") {
      throw new Error(
        "Your role is not Donor So you can not use this features"
      );
    }
    if (inventoryType === "out" && user.role !== "Organization") {
      throw new Error(
        "Your role is not Hospital So you can not use this features"
      );
    }
    if (inventoryType === "out") {
      const requestBloodgroup = req.body.bloodgroup;
      const reqbloodgroupQuantity = req.body.Quantity;
      const organization = new mongoose.Types.ObjectId(req.body.userId)
      console.log("organizationeeeeeeeeeeeeeee",o)
      const totanumberofRequestbloodIn = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "in",
            bloodgroup: requestBloodgroup,
          },
        },
        {
          $group: {
            _id: "$bloodgroup",
            total: { $sum: "$Quantity" },
          },
        },
      ]);
      const totalInblood = totanumberofRequestbloodIn[0]?.total || 0
      console.log("totalInblood",totalInblood)
      const totalnumberofOutblood = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "out",
            bloodgroup: requestBloodgroup,
          },
        },
        {
          $group: {
            _id: "$bloodgroup",
            total: { $sum: "$Quantity" },
          },
        },
      ]);
      const totalOutblood = totalnumberofOutblood[0]?.total || 0;
      console.log("totalOutblood",totalnumberofOutblood[0]?.total)
      const totalbloodQuantity = totalInblood - totalOutblood;
      // console.log(first)
      if (totalbloodQuantity < reqbloodgroupQuantity) {
        res
          .status(500)
          .json({
            message: `Currently Not avilable blood as per your Requirment only ${totalbloodQuantity}ML blood for your Organization`,
          });
        
      }
      else{
        const inventory = await inventoryModel.create(req.body);
        console.log("inventory", inventory);
        res.status(200).json({ message: "Succsessfully add Blood Record" });
      }
    }else if(inventoryType === 'in' ){
      const inventory = await inventoryModel.create(req.body);
      console.log("inventory", inventory);
      res.status(200).json({ message: "Succsessfully add Blood Record" });
    }
    
  // }
  //  catch (e) {
  //   res.status(400).json({ message: "Your Record is not added" });
  // }
};
const getInventory = async (req, res) => {
  try {
    const user = await inventoryModel
      .find({Organization:req.user.userId})
      .populate("Hospital")
      .populate("Donor").populate("Organization")
    console.log("user",req.user.userId)
    res.status(200).json({user});
  } catch (e) {
    res.status(400).json({ message: "Not get Inventorey" });
  }
};

module.exports = { createInventory, getInventory };
