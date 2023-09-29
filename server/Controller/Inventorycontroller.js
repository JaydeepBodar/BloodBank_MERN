const monggose = require("mongoose");
const inventoryModel = require("../Model/inventoryModel");
const userModel = require("../Model/userModel");
const createInventory = async (req, res) => {
  // try {
  // console.log("gggggggggg", req.user.userId);
  const { inventoryType, email } = req.body;

  const user = await userModel.findOne({ _id: req.user.userId });
  const userdata = await userModel.findOne({ email });
  if (!userdata) {
    res
      .status(400)
      .json({ message: "Your email id is not registered in Our System" });
  } else {
    if (inventoryType === "in" && user?.role !== "Donor") {
      res.status(405).json({
        message:
          "As per your email id yor role is not Donor so you can not use this features",
      });
    } else if (inventoryType === "out" && user?.role !== "Organization") {
      res.status(408).json({
        message:
          "As per your email id yor role is not Organization so you can not use this features",
      });
    } else {
      if (inventoryType === "out") {
        const requestBloodgroup = req.body.bloodgroup;
        const reqbloodgroupQuantity = req.body.Quantity;
        // console.log(
        //   "organizationeeeeeeeeeeeeeee",
        //   new monggose.Types.ObjectId(req.user.userId)
        // );
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
        // console.log("totalInblood", totalInblood);
        const totalOutblood = totalnumberofOutblood[0]?.total || 0;
        // console.log("totalOutblood", totalOutblood);
        const totalbloodQuantity = totalInblood - totalOutblood;
        // console.log("totalbloodQuantity", totalbloodQuantity);
        if (totalbloodQuantity < reqbloodgroupQuantity) {
          res.status(409).json({
            message: `Currently Not avilable blood as per your Requirment only ${totalbloodQuantity}ML blood for your Organization`,
          });
        } else {
          const inventory = await inventoryModel.create(req.body);
          // console.log("inventory", inventory);
          res.status(200).json({ message: "Succsessfully add Blood Record" });
        }
      } else if (inventoryType === "in") {
        const checkbloodgroup = await userModel.find({
          _id: req.user.userId,
        });
        console.log("checkbloodgroup", checkbloodgroup);
        if (req.body.bloodgroup === checkbloodgroup[0]?.bloodgroup) {
          const inventory = await inventoryModel.create(req.body);
          // console.log("inventory", inventory);
          res.status(201).json({ message: "Succsessfully add Blood Record" });
        } else {
          res.status(403).json({
            message: `Your blood group is ${checkbloodgroup[0]?.bloodgroup} so please enter correct one`,
          });
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
    const blooddata = {
      inventoryType: req.query.inventoryType,
      bloodgroup: req.query.bloodgroup,
    };
    // console.log("firstblooddatablooddata", blooddata);
    const data =
      blooddata?.bloodgroup !== undefined ||
      blooddata?.inventoryType !== undefined;
    // console.log("bloodblooddata === undefined", data);
    const query = data
      ? {
          $and: [
            { Organization: req.user.userId },
            {
              $or: [
                {
                  inventoryType: {
                    $regex: blooddata?.inventoryType || " ",
                    $options: "i",
                  },
                },
                {
                  bloodgroup: {
                    $regex: blooddata?.bloodgroup || " ",
                    $options: "i",
                  },
                },
              ],
            },
          ],
        }
      : { Organization: req.user.userId };
    // { inventoryType: "in" },
    // { inventoryType: "out" },

    // console.log("firstqueryquery", query);
    const itemperpage = 10;
    const currentpage = Number(req.query.page) || 1;
    const totalskipitem = itemperpage * (currentpage - 1);
    const totalitem = await inventoryModel.find(query).countDocuments();
    const allInventory = await inventoryModel
      .find(query)
      .populate("Hospital")
      .populate("Donor")
      .limit(itemperpage)
      .skip(totalskipitem)
      .sort({ createdAt: -1 });
    // console.log("user", req.user.userId);
    res.status(200).json({ allInventory, totalitem, itemperpage });
  } catch (e) {
    res.status(400).json({ message: "Not get Inventorey" });
  }
};
const getDonorInventory = async (req, res) => {
  const { bloodgroup, page } = req.query;
  const querydata =
    bloodgroup !== undefined
      ? {
          $and: [
            { Organization: req.user.userId },
            { inventoryType: "in" },
            {
              bloodgroup: {
                $regex: bloodgroup || " ",
                $options: "i",
              },
            },
          ],
        }
      : {
          $and: [{ Organization: req.user.userId }, { inventoryType: "in" }],
        };
  const itemperpage = 10;
  const currentpage = Number(page) || 1;
  const skipage = itemperpage * (currentpage - 1);
  const totalitem = await inventoryModel.find(querydata).countDocuments();
  const getDonorInventory = await inventoryModel
    .find(querydata)
    .populate("Donor")
    .limit(itemperpage)
    .skip(skipage)
    .sort({ createdAt: -1 })
    .then((data) => {
      return data;
    })
    .catch((e) => console.log("err", e));
  res.status(200).json({ getDonorInventory, totalitem, itemperpage });
};
const getIndivisualdonorinventory = async (req, res) => {
  const donorInventory = await inventoryModel
    .find({ Donor: req.user.userId })
    .populate("Donor")
    .populate("Organization")
    .sort({ createdAt: -1 });
  if (!donorInventory) {
    res.status(400).json({ message: "No Donor data found" });
  }
  res.status(200).json({ donorInventory });
};
const hospitalInventory = async (req, res) => {
  const { bloodgroup, page } = req.query;
  const querydata =
    bloodgroup !== undefined
      ? {
          $and: [
            { Organization: req.user.userId },
            { inventoryType: "out" },
            {
              bloodgroup: {
                $regex: bloodgroup || " ",
                $options: "i",
              },
            },
          ],
        }
      : {
          $and: [{ Organization: req.user.userId }, { inventoryType: "out" }],
        };
  const itemperpage = 10;
  const currentpage = Number(page) || 1;
  const skipitem = itemperpage * (currentpage - 1);
  const totalitem = await inventoryModel.find(querydata).countDocuments();
  const gethospitalInventory = await inventoryModel
    .find(querydata)
    .populate("Hospital")
    .skip(skipitem)
    .limit(itemperpage)
    .sort({ createdAt: -1 });
  res.status(200).json({ gethospitalInventory, itemperpage, totalitem });
};
const getOrganizationbydonor = async (req, res) => {
  const getOrganization = await inventoryModel.distinct("Organization", {
    Donor: req.user.userId,
  });
  const { organization, page } = req.query;
  const querydata =
    organization !== undefined
      ? {
          $and: [
            { _id: getOrganization },
            {
              $or: [
                { email: { $regex: organization || "", $options: "i" } },
                {
                  organizationName: {
                    $regex: organization || "",
                    $options: "i",
                  },
                },
              ],
            },
          ],
        }
      : { _id: getOrganization };
  const itemperpage = 10;
  const currentpage = Number(page) || 1;
  const skippage = itemperpage * (currentpage - 1);
  const totalitem = await userModel.find(querydata).countDocuments();
  const getDonorOrganization = await userModel
    .find(querydata)
    .limit(itemperpage)
    .skip(skippage)
    .sort({ createdAt: -1 });
  console.log("firstdata", getDonorOrganization);
  res.status(200).json({ getDonorOrganization, totalitem, itemperpage });
};
const getOrganizationbyhospital = async (req, res) => {
  const getOrganization = await inventoryModel.distinct("Organization", {
    Hospital: req.user.userId,
  });
  const { organization, page } = req.query;
  const querydata =
    organization !== undefined
      ? {
          $and: [
            { _id: getOrganization },
            {
              $or: [
                { email: { $regex: organization || "", $options: "i" } },
                {
                  organizationName: {
                    $regex: organization || "",
                    $options: "i",
                  },
                },
              ],
            },
          ],
        }
      : { _id: getOrganization };
  const itemperpage = 10;
  const currentpage = Number(page) || 1;
  const skippage = itemperpage * (currentpage - 1);
  const totalitem = await userModel.find(querydata).countDocuments();
  const getHospitalorganization = await userModel
    .find(querydata)
    .limit(itemperpage)
    .skip(skippage)
    .sort({ createdAt: -1 });
  res.status(200).json({ getHospitalorganization, totalitem, itemperpage });
};
const getHospitalindiviusalinventory = async (req, res) => {
  const hospitalinventory = await inventoryModel
    .find({ Hospital: req.user.userId })
    .populate("Hospital")
    .populate("Organization")
    .sort({ createdAt: -1 });
  if (!hospitalInventory) {
    res.status(400).json({ message: "No hospital data found" });
  }
  res.status(200).json({ hospitalinventory });
};
module.exports = {
  createInventory,
  getInventory,
  getDonorInventory,
  hospitalInventory,
  getIndivisualdonorinventory,
  getOrganizationbydonor,
  getOrganizationbyhospital,
  getHospitalindiviusalinventory,
};
