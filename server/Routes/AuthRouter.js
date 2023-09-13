const routes = require("express").Router();
const { Router } = require("express");
const { registerUser,loginUser,getUser,getDonor,getSingledonor } = require("../Controller/AuthController");
const protectRoutes=require("../Middleware/middleware")
routes.post("/register",registerUser)
routes.post("/login", loginUser)
routes.get("/user",protectRoutes,getUser)
routes.get("/donor",protectRoutes,getDonor)
routes.get("/donor/:id",protectRoutes,getSingledonor)
module.exports=routes
 