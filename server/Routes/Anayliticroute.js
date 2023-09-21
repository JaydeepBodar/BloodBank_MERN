const routes = require("express").Router();
const authmiddleware = require("../Middleware/middleware");
const { Anaylitic } = require("../Controller/Anyalyticinventory");
routes.get("/anaylitic", authmiddleware, Anaylitic);
module.exports = routes
