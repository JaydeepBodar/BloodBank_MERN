const routes = require("express").Router();
const { Authentication } = require("../Middleware/middleware");
const {
  createInventory,
  getInventory,
  getDonorInventory,
  hospitalInventory,
  getIndivisualdonorinventory,
  getOrganizationbydonor,
  getOrganizationbyhospital,
  getHospitalindiviusalinventory,
} = require("../Controller/Inventorycontroller");
routes.post("/createInventory", Authentication, createInventory);
routes.get("/getInventory", Authentication, getInventory);
routes.get("/donorinventory", Authentication, getDonorInventory);
routes.get("/hospitalinventory", Authentication, hospitalInventory);
routes.get("/indivisualdonor", Authentication, getIndivisualdonorinventory);
routes.get("/donororganization", Authentication, getOrganizationbydonor);
routes.get("/hospitalorganization", Authentication, getOrganizationbyhospital);
routes.get(
  "/indivisualhospitalinventory",
  Authentication,
  getHospitalindiviusalinventory
);
module.exports = routes;
