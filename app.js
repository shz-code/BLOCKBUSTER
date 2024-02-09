const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const trainRouter = require("./routes/trainRouter");
const stationRouter = require("./routes/stationRouter");
const walletRouter = require("./routes/walletRouter");

const ticketsRouter = require("./routes/ticketsRouter");

// Loading environment variables from .env file
require("dotenv").config();

// url
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.adsqwep.mongodb.net/?retryWrites=true&w=majority`;

// database configuration
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed!", error);
    process.exit();
  });

// Creating Express application instance
const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Database Connected");
});

app.use("/api/users", userRouter);
app.use("/api/stations", stationRouter);
app.use("/api/trains", trainRouter);
app.use("/api/wallets", walletRouter);

app.use("/api/tickets", ticketsRouter);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
