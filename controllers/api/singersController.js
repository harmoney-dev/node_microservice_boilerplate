/**
 * @description Singers endpoint controller
*/
'use strict';
const
    express = require('express'),
    singersService = require('../../services/singers/singersService');

let router = express.Router();

// endpoint /api/v1/singers/
router.get('/', singersService.getSingers);

// endpoint /api/v1/singers/:id
router.get('/:id', singersService.getSingerByID);

module.exports = router;