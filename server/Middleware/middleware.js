const jwt = require("jsonwebtoken");
const Authentication = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.SECERETKEY
    );
    req.user = decode;
    // console.log("req.user=decode",req.user=decode)
    next();
  } catch (e) {
    res
      .status(401)
      .json({ message: "Not Authorized First You need to log in" });
  }
};
module.exports = { Authentication };
