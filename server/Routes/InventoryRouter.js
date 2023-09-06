const routes = require("express").Router();
const Authmiddleware = require("../Middleware/middleware");
const { createInventory,getInventory } = require("../Controller/Inventorycontroller");
routes.post("/createInventory", Authmiddleware, createInventory);
routes.get("/getInventory",Authmiddleware,getInventory)
module.exports =routes
