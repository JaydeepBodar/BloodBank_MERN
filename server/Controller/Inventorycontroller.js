const monggose = require("mongoose");
const inventoryModel = require("../Model/inventoryModel");
const userModel = require("../Model/userModel");
const createInventory = async (req, res) => {
  // try {
    console.log("gggggggggg", req.user.userId);
    const { inventoryType, email, bloodgroup, Quantity, Organization } = req.body;
    if (!inventoryType || !email || !Quantity || !bloodgroup || !Organization) {
      res.status(403).json({ message: "All field are required" })
    }
    else {
      const user = await userModel.findOne({ email });
      if (!user) {
        res.status(400).json({ message: "Your email id is not registered in Our System" })
      }
      else {
        if (inventoryType === "in" && user?.role !== "Donor") {
          res.status(405).json({ message: "As per your email id yor role is not Donor so you can not use this features" });
        }
        else if (inventoryType === "out" && user?.role !== "Hospital") {
          res.status(408).json({ message: "As per your email id yor role is not Hospital so you can not use this features" });
        }
        else {
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
              res.status(409).json({
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
            res.status(201).json({ message: "Succsessfully add Blood Record" });
          }
        }
      }
    }

  // }
  // catch (e) {
  //   res.status(500).json({ message: "Your Record is not added" });
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
const getIndivisualdonorinventory = async (req, res) => {
  const donorInventory = await inventoryModel.find({ Donor: req.user.userId }).populate("Donor").populate("Organization")
  if (!donorInventory) {
    res.status(400).json({ message: "No Donor data found" })
  }
  res.status(200).json({ donorInventory })
}
const hospitalInventory = async (req, res) => {
  const gethospitalInventory = await inventoryModel.find({
    $and: [{ Organization: req.user.userId }, { inventoryType: "out" }],
  }).populate("Hospital")
  res.status(200).json({ gethospitalInventory })
}
const getOrganizationbydonor = async (req, res) => {
  const getOrganization = await inventoryModel.distinct("Organization", { Donor: req.user.userId })
  const getDonorOrganization = await userModel.find({ _id: getOrganization })
  console.log("firstdata", getDonorOrganization)
  res.status(200).json({getDonorOrganization})
}
module.exports = { createInventory, getInventory, getDonorInventory, hospitalInventory, getIndivisualdonorinventory, getOrganizationbydonor };
