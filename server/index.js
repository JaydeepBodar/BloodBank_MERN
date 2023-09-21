const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const Authrouter=require('./Routes/AuthRouter')
const Inventoryrouter=require('./Routes/InventoryRouter')
const anaylitic=require('./Routes/Anayliticroute')
const mongoose = require("mongoose");
dotenv.config();
app.use(express.json())
app.use(cors());
app.use('/auth',Authrouter)
app.use('/inventory',Inventoryrouter)
app.use('/inventory',anaylitic)
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
