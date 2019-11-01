const Car = require('../models/cars');

// Create and Save a new Car
exports.create = (req, res) => {
    console.log(req)
    if(req.body.CarName==null || req.body.CarModel == null) {
        return res.status(400).send({
            message: "Car details can not be empty"
        });
    }

    // Create a Car
    const car = new Car({
        CarName: req.body.CarName,
        CarModel:req.body.CarModel,  
    });

    // Save Car in the database
    car.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while saving your record of Car."
        });
    });

};

// Retrieve and return all Cars from the database.
exports.findAll = (req, res) => {
    Car.find()
    .then(Cars => {
        res.send(Cars);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Cars."
        });
    });

};

// Find a single Car with a CarId
exports.findOne = (req, res) => {
    Car.findById(req.params.CarId)
    .then(Car => {
        if(!Car) {
            return res.status(404).send({
                message: "Car not found with id " + req.params.CarId
            });            
        }
        res.send(Car);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Car not found with id " + req.params.CarId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Car with id " + req.params.CarId
        });
    });

};

// Update a Car identified by the CarId in the request
exports.update = (req, res) => {

    // Find note and update it with the request body
    Car.findByIdAndUpdate(req.params.CarId, {
        CarName: req.body.CarName,
        CarModel:req.body.CarModel,  
    }, {new: true})
    .then(Car => {
        if(!Car) {
            return res.status(404).send({
                message: "Car not found with id " + req.params.CarId
            });
        }
        res.send(Car);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Car not found with id " + req.params.CarId
            });                
        }
        return res.status(500).send({
            message: "Error updating Car with id " + req.params.CarId
        });
    });

};


// Delete a Car with the specified CarId in the request
exports.delete = (req, res) => {
    Car.findByIdAndRemove(req.params.CarId)
    .then(Car => {
        if(!Car) {
            return res.status(404).send({
                message: "Car not found with id " + req.params.CarId
            });
        }
        res.send({message: "Car deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Car not found with id " + req.params.CarId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Car with id " + req.params.CarId
        });
    });

};