const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

const bookingsSchema = mongoose.Schema({
  CarId: ObjectId,
  ForDate:Date,
  Day:String,
  Month:String,
  Year:String
},{
    timestamps: true
});


module.exports = mongoose.model("bookings", bookingsSchema);