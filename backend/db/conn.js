const mongoose = require("mongoose");

const url = "mongodb+srv://abhinpatel11:abhipatel11@cluster0.e427izz.mongodb.net/vehicle-rental-app";

mongoose
  .connect(url, { 
    useNewUrlParser: true })
  .then(() => {
    console.log("Database successfully connected.");
  })
  .catch((err) => console.log(err));
