const mongoose = require("mongoose");

// Building Schema
const carSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
    },
    color: {
      type: String,
    },
    price: {
      type: Number,
    },
    acceleration: {
      type: Number,
    },
    maximumSpeed: {
      type: Number,
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
    },
  },
  { timestamps: true }
);

// Building model
const Car = mongoose.model("Car", carSchema);

// exporting Model : Car
module.exports = Car;
