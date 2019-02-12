'use strict';
require('dotenv').config()
const express = require('express');
const eureka_client = require('./clients/Eureka');
const app = express();


// Constants, move to .env file next
const PORT = process.env.PORT;
const HOST = process.env.HOST;

// add routes to the server and initialize the api endpoints
let router = require('./routes/router');
router.init(app);

// initialize eureka client and start it with the express app
eureka_client.init();
eureka_client.start(app);

//listen to the incoming requests
app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);