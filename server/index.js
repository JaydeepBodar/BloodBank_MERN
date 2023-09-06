const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
dotenv.config();
app.use(express.json())
app.use(cors());

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(`App not connected on ${process.env.PORT}`);
  } else {
    console.log(`App Succsessfully conected on ${process.env.PORT}`);
  }
});
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Data base connected succsessfully"))
  .catch(() => console.log("Database not connected"));
