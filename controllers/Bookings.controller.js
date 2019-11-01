const Booking = require('../models/bookings');
const Car = require('../models/cars');

function getFormattedDate(inputDate) {
    var date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
        // Months use 0 index.
        return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
    }
  
    return month + '/' + day + '/' + year;
}

// Create and Save a new Car
exports.create = (req, res) => {
    console.log(req)
    if(req.body.CarId==null || req.body.ForDate == null) {
        return res.status(400).send({
            message: "Booking details can not be empty"
        });
    }

    // Create a Car
    const booking = new Booking({
        CarId: req.body.CarId,
        ForDate:getFormattedDate(req.body.ForDate),
        Day:(new Date(req.body.ForDate)).getDate(),
        Month:(new Date(req.body.ForDate)).getMonth()+1,
        Year:(new Date(req.body.ForDate)).getFullYear()
    });

    // Save Car in the database

    console.log(booking)

    Booking.find({CarId: booking.CarId, Day:booking.Day, Month:booking.Month, Year:booking.Year})
    .then(Booking => {
            if(Booking.length == 0){
                booking.save()
                .then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while saving your record of Booking."
                    });
                });
            }
            else{
                return res.status(404).send({
                    message: "This Car is not available on "+ booking.ForDate + " with CarId " +booking.CarId
                });    
            }
          
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "This Car is not available on "+ booking.ForDate + "   with CarId " +booking.CarId
            });                
        }
        return res.status(500).send({
            message: "There was some error while processing your request"
        });
    });
};

// Retrieve and return all Cars from the database.
exports.findAll = (req, res) => {
    Booking.find()
    .then(Booking => {
        res.send(Booking);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Bookings."
        });
    });
};

//Show Available Cars for booking on a particular date

exports.availableCars = (req, res) => {
    const reqDate = new Date(req.body.date);
    console.log(reqDate);
    Car.aggregate([{
    $lookup:
      {
        from: "bookings",
        localField: "_id",
        foreignField: "CarId",
        as: "matched_docs"
      }
 }],function(err,data){
    filteredData = [];
    for(x of data){
        found = false;
        for(m of x.matched_docs){
            if(m.Day == reqDate.getDate() && m.Month == reqDate.getMonth()+1 && m.Year == reqDate.getFullYear()){
                found = true;
            }
        }
        if(!found){
            filteredData.push(x)
        }
    }
    res.send(filteredData)
})
}

// Find a single Car with a CarId
exports.findOne = (req, res) => {
    Booking.findById(req.params.BookingId)
    .then(Booking => {
        console.log(Booking)
        if(!Booking) {
            return res.status(404).send({
                message: "Booking not found with id " + req.params.BookingId
            });            
        }
        res.send(Booking);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Booking not found with id " + req.params.BookingId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Booking with id " + req.params.BookingId
        });
    });

};

// Update a Car identified by the CarId in the request
exports.update = (req, res) => {

    // Find note and update it with the request body
    Booking.findByIdAndUpdate(req.params.CarId, {
        CarId: req.body.CarId,
        ForDate:getFormattedDate(req.body.ForDate),
        Day:(new Date(req.body.ForDate)).getDate(),
        Month:(new Date(req.body.ForDate)).getMonth()+1,
        Year:(new Date(req.body.ForDate)).getFullYear()     
    }, {new: true})
    .then(Booking => {
        if(!Booking) {
            return res.status(404).send({
                message: "Booking not found with id " + req.params.BookingId
            });
        }
        res.send(Booking);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Booking not found with id " + req.params.BookingId
            });                
        }
        return res.status(500).send({
            message: "Error updating Booking with id " + req.params.BookingId
        });
    });

};


// Delete a Car with the specified CarId in the request
exports.delete = (req, res) => {
    Booking.findByIdAndRemove(req.params.BookingId)
    .then(Car => {
        if(!Booking) {
            return res.status(404).send({
                message: "Booking not found with id " + req.params.BookingId
            });
        }
        res.send({message: "Booking deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Booking not found with id " + req.params.BookingId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Booking with id " + req.params.BookingId
        });
    });

};