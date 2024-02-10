const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/vehicle-rental";

mongoose
  .connect(url, { 
    useNewUrlParser: true })
  .then(() => {
    console.log("Database successfully connected.");
  })
  .catch((err) => console.log(err));
