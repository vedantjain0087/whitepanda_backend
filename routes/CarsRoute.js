module.exports = (app) => {
    const Cars = require('../controllers/Cars.controller.js');

    // Create a new User
    app.post('/Car', Cars.create);

    // Retrieve all Users
    app.get('/Cars', Cars.findAll);

    // Retrieve a single User with UserId
    app.get('/Cars/:CarId', Cars.findOne);

    // Update a User with UserId
    app.put('/Cars/:CarId', Cars.update);

    // Delete a User with UserId
    app.delete('/Cars/:CarId', Cars.delete);
}