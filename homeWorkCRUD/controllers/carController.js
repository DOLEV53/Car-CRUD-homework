const mongoose = require("mongoose");
const Car = require("../models/carModel");
const fs = require("fs");

// Read
const carRead_get = async (req, res) => {
  try {
    // first i go to the database and collecting the array of cars objects
    const carCollection = await Car.find();
    // second i check if there is any cars
    carCollection.length > 0
      ? // if there is i want to get them
        res.json(carCollection)
      : //if not send this messege
        res.send("There is no cars avilbale");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Create
const carCreate_post = async (req, res) => {
  try {
    // creatihg car in the database collection using scheme in the model i build
    const createCar = await Car.create(req.body);
    // asking back the car that i build in json
    res.json(createCar);
  } catch (err) {
    res.send("There was an error");
    console.log(err);
  }
};

// Update
const carUpdate_put = async (req, res) => {
  // here i am asking the parmeter id from the car object that i build in the database
  const id = mongoose.Types.ObjectId(req.params.id);
  try {
    // now i am useing mongoose method to find the car id that i want to update and updated
    const carUpdate = await Car.findByIdAndUpdate(id, req.body);
    // sending good and the updated car in json
    res.status(204).json(carUpdate);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete
const carDelete_delete = async (req, res) => {
  // here i am asking the parmeter id from the car object that i build in the database
  const id = mongoose.Types.ObjectId(req.params.id);
  try {
    // now i am useing mongoose method to find the car id that i want to delete from the database
    const carDelete = await Car.findByIdAndDelete(id);
    res.status(200).json(carDelete);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Reset
const carReset_get = async (req, res) => {
  // first i want do delete the array of cars objects from the database
  await Car.collection.drop();
  // second i want to get from a json file a collection of cars that i build hardcoded
  fs.readFile("./cars.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.json("Fail");
      return;
    }
    const carJson = JSON.parse(data);
    // enter every car to the database
    carJson.forEach((car) => {
      new Car(car).save();
    });
    res.json("Success");
  });
};

// Buy
const carBuy_put = async (req, res) => {
  // here i am asking the parmeter id from the car object that i build in the database
  const id = mongoose.Types.ObjectId(req.params.id);
  try {
    // here i am find the car that the user want to buy
    const carAmount = await Car.findById(id);
    // in simple js i am checking the amount of cars that i left after user buing one
    // if left 0 i send back status 409
    // if left more then 0 i updated to amount of the same car - 1
    if (carAmount === 0) {
      res.status(409).send("no more cars in the collection");
    } else {
      carAmount.amount = carAmount.amount - 1;
      await Car.findByIdAndUpdate(id, carAmount);
      res.send("the car salled");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  // Read
  carRead_get,
  // Create
  carCreate_post,
  //Update
  carUpdate_put,
  //Delete
  carDelete_delete,
  //Reset
  carReset_get,
  //Buy with Update
  carBuy_put,
};
