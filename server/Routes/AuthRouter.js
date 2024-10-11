const routes = require("express").Router();
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
const {Authentication} = require("../Middleware/middleware");
routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.get("/user", Authentication, getUser);
routes.get("/donor", Authentication, getDonor);
routes.get("/donor/:id", Authentication, getSingleuser);
routes.get("/organization",Authentication, getOrganization);
routes.get("/hospital",Authentication,getHospital);
routes.delete("/user/:id",Authentication,deleteSingleuser)
module.exports = routes;
