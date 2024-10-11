const routes = require("express").Router();
const {Authentication} = require("../Middleware/middleware");
const { Anaylitic } = require("../Controller/Anyalyticinventory");
routes.get("/anaylitic", Authentication, Anaylitic);
module.exports = routes
