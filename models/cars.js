const mongoose = require("mongoose");

const carsSchema = mongoose.Schema({
  CarName: String,
  CarModel:String,  
},{
    timestamps: true
});


module.exports = mongoose.model("cars", carsSchema);