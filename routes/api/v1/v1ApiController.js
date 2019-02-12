/**
 * Manages the routes of the API v1
 * Each route needs a controller
 * Also adds a ping endpoint to the API v1 so the health can be checked through /api/v1/ping
 */
'use strict';
const health = require('express-ping');
const
    express = require('express'),
    singersController = require('../../../controllers/api/singersController');

let router = express.Router();
//health check: api/v1/ping
router.use(health.ping());
// Singers route: api/v1/singers
router.use('/singers', singersController);

module.exports = router;