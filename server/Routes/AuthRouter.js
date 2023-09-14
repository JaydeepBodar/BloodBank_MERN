const routes = require("express").Router();
const { Router } = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  getDonor,
  getSingleuser,
  getOrganization,
  getHospital,
  deleteSingleuser
} = require("../Controller/AuthController");
const protectRoutes = require("../Middleware/middleware");
routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.get("/user", protectRoutes, getUser);
routes.get("/donor", protectRoutes, getDonor);
routes.get("/donor/:id", protectRoutes, getSingleuser);
routes.get("/organization",protectRoutes, getOrganization);
routes.get("/hospital",protectRoutes,getHospital);
routes.delete("/user/:id",protectRoutes,deleteSingleuser)
module.exports = routes;
