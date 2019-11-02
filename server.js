const express = require('express')

const bodyParser = require('body-parser');
const app=express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const dbConfig = require('./config/config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Welcome to whitepanda cars API module"});
});

require('./routes/CarsRoute.js')(app);
require('./routes/BookingRoutes.js')(app);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening on port 3000");
});
