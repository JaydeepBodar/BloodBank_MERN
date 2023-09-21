const inventoryModel = require("../Model/inventoryModel");
const monggose = require("mongoose");
const Anaylitic = async (req, res) => {
  const blood=["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]
  const bloodData=[]
  await Promise.all(blood.map(async(blood)=>{
    
    console.log("blood",blood)
    const totalnumberofOutblood = await inventoryModel.aggregate([
      {
        $match: {
          bloodgroup:blood,
          inventoryType: "out",
          Organization: new monggose.Types.ObjectId(req.user.userId),
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$Quantity" },
        },
      },
    ]);
    const totanumberofRequestbloodIn = await inventoryModel.aggregate([
      {
        $match: {
          bloodgroup:blood,
          inventoryType: "in",
          Organization: new monggose.Types.ObjectId(req.user.userId),
        },
      },
      {
        $group: {
          _id:null,
          total: { $sum: "$Quantity" },
        },
      },
    ]);
    const totalblood =totanumberofRequestbloodIn[0]?.total - totalnumberofOutblood[0]?.total;
    
    bloodData.push({totalblood,totanumberofRequestbloodIn,totalnumberofOutblood,blood})
  }))
  console.log("bloodData",bloodData)
  res.status(200).json({bloodData})
};
module.exports = { Anaylitic };
