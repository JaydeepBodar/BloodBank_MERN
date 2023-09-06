const routes = require("express").Router();
const { registerUser,loginUser,getUser } = require("../Controller/AuthController");
const protectRoutes=require("../Middleware/middleware")
routes.post("/register",registerUser)
routes.post("/login", loginUser)
routes.get("/user",protectRoutes,getUser)
module.exports=routes
 