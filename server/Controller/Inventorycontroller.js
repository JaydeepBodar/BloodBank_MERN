const { default: mongoose } = require("mongoose");
const monggose = require("mongoose");
const inventoryModel = require("../Model/inventoryModel");
const userModel = require("../Model/userModel");
const createInventory = async (req, res) => {
  // try {
  console.log("gggggggggg", req.user.userId);
  const { inventoryType, email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  if (inventoryType === "in" && user.role !== "Donor") {
    throw new Error("Your role is not Donor So you can not use this features");
  }
  // if (inventoryType === "out" && user.role !== "Organization") {
  //   throw new Error(
  //     "Your role is not Organization So you can not use this features"
  //   );
  // }
  if (inventoryType === "out") {
    const requestBloodgroup = req.body.bloodgroup;
    const reqbloodgroupQuantity = req.body.Quantity;
    console.log(
      "organizationeeeeeeeeeeeeeee",
      new monggose.Types.ObjectId(req.user.userId)
    );
    const totalnumberofOutblood = await inventoryModel.aggregate([
      {
        $match: {
          inventoryType: "out",
          bloodgroup: requestBloodgroup,
          Organization: new monggose.Types.ObjectId(req.user.userId),
        },
      },
      {
        $group: {
          _id: "$bloodgroup",
          total: { $sum: "$Quantity" },
        },
      },
    ]);
    const totanumberofRequestbloodIn = await inventoryModel.aggregate([
      {
        $match: {
          inventoryType: "in",
          bloodgroup: requestBloodgroup,
          Organization: new monggose.Types.ObjectId(req.user.userId),
        },
      },
      {
        $group: {
          _id: "$bloodgroup",
          total: { $sum: "$Quantity" },
        },
      },
    ]);
    const totalInblood = totanumberofRequestbloodIn[0]?.total || 0;
    console.log("totalInblood", totalInblood);
    const totalOutblood = totalnumberofOutblood[0]?.total || 0;
    console.log("totalOutblood", totalOutblood);
    const totalbloodQuantity = totalInblood - totalOutblood;
    console.log("totalbloodQuantity", totalbloodQuantity);
    if (totalbloodQuantity < reqbloodgroupQuantity) {
      res.status(500).json({
        message: `Currently Not avilable blood as per your Requirment only ${totalbloodQuantity}ML blood for your Organization`,
      });
    } else {
      const inventory = await inventoryModel.create(req.body);
      console.log("inventory", inventory);
      res.status(200).json({ message: "Succsessfully add Blood Record" });
    }
  } else if (inventoryType === "in") {
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
    const allInventory = await inventoryModel
      .find({ Organization: req.user.userId })
      .populate("Hospital")
      .populate("Donor");
    console.log("user", req.user.userId);
    res.status(200).json({ allInventory });
  } catch (e) {
    res.status(400).json({ message: "Not get Inventorey" });
  }
};
const getDonorInventory = async (req, res) => {
  const getDonorInventory = await inventoryModel.find({
    $and: [{ Organization: req.user.userId }, { inventoryType: "in" }],
  }).populate("Donor")
  res.status(200).json({ getDonorInventory });
};
const hospitalInventory=async(req,res)=>{
  const gethospitalInventory = await inventoryModel.find({
    $and: [{ Organization: req.user.userId }, { inventoryType: "out" }],
  }).populate("Hospital")
  res.status(200).json({gethospitalInventory})
}
module.exports = { createInventory, getInventory, getDonorInventory,hospitalInventory };
