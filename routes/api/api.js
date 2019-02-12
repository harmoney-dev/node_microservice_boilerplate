'use strict';
/**
 * This layer is used in case of having multiples versions of API's.
 * For example, to v1 of the API, we use the v1ApiController
*/
const
    express = require('express'),
    v1ApiController = require('./v1/v1ApiController');

let router = express.Router();
router.use('/v1', v1ApiController);

module.exports = router;