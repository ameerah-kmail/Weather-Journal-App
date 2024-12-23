// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);
function listening() {
    console.log(`running in localhost:${port}`);
}

// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get('/all', function (req, res) {
    res.send(projectData);
});

// Post Route
app.post('/add', function (req, res) {
    console.log('Request body:', req.body);
    const { temperature, date, userResponse } = req.body;
    projectData = { temperature, date, userResponse };
    res.send({ success: true, message: "Data added successfully" });
});
