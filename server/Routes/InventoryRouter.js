const routes = require("express").Router();
const Authmiddleware = require("../Middleware/middleware");
const {
  createInventory,
  getInventory,
  getDonorInventory,
  hospitalInventory,
} = require("../Controller/Inventorycontroller");
routes.post("/createInventory", Authmiddleware, createInventory);
routes.get("/getInventory", Authmiddleware, getInventory);
routes.get("/donorinventory", Authmiddleware, getDonorInventory);
routes.get("/hospitalinventory", Authmiddleware, hospitalInventory);
module.exports = routes;
