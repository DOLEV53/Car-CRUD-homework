const express = require("express");
const app = express();
const mongoose = require("mongoose");
const carRoutes = require("./routes/carRoutes");

//middelwhere
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connecting to database in mongo db compass
const dbURI = "mongodb://localhost:27017/homeWorkCRUD";
mongoose.set("strictQuery", false);
mongoose
  .connect(dbURI)
  .then((result) =>
    app.listen(3000, () => {
      console.log("connect to mongo db compass");
    })
  )
  .catch((err) => console.log(err));

// inporting router
app.use("/cars", carRoutes);
