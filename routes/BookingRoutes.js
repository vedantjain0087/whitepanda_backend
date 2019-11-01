module.exports = (app) => {
    const Bookings = require('../controllers/Bookings.controller.js');

    // Create a new Booking
    app.post('/Booking', Bookings.create);

    // Create a new Booking
    app.post('/AvialableCars', Bookings.availableCars);

    // Retrieve all Bookings
    app.get('/Bookings', Bookings.findAll);

    // // Retrieve a single Booking with BookingId
    app.get('/Bookings/:BookingId', Bookings.findOne);

    // Delete a Booking with BookingId
    app.delete('/Bookings/:BookingId', Bookings.delete);
}