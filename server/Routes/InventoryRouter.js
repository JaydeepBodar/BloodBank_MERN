const routes = require("express").Router();
const Authmiddleware = require("../Middleware/middleware");
const {
  createInventory,
  getInventory,
  getDonorInventory,
  hospitalInventory,
  getIndivisualdonorinventory,
  getOrganizationbydonor
} = require("../Controller/Inventorycontroller");
routes.post("/createInventory", Authmiddleware, createInventory);
routes.get("/getInventory", Authmiddleware, getInventory);
routes.get("/donorinventory", Authmiddleware, getDonorInventory);
routes.get("/hospitalinventory", Authmiddleware, hospitalInventory);
routes.get("/indivisualdonor", Authmiddleware, getIndivisualdonorinventory)
routes.get("/donororganization",Authmiddleware ,getOrganizationbydonor)
module.exports = routes;
