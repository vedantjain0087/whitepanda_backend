module.exports = (app) => {
    const Cars = require('../controllers/Cars.controller.js');

    // Create a new Car
    app.post('/Car', Cars.create);

    // Retrieve all Cars
    app.get('/Cars', Cars.findAll);

    // // Retrieve a single Car with CarId
    app.get('/Cars/:CarId', Cars.findOne);

    // Update a Car with CarId
    app.put('/Cars/:CarId', Cars.update);

    // Delete a Car with CarId
    app.delete('/Cars/:CarId', Cars.delete);
}