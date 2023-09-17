const express = require('express');
const jwtMiddleware = require('../handlers/jwtMiddleware');
const { body, validationResult } = require('express-validator');
const { readDataFromFile, writeDataToFile } = require('../handlers/dataHandler');
const router = express.Router();

// get home page and display all services from services.json
router.get('/', );

// get service dashboard page - Protected by JWT
router.get('/services',);

// Add a new service - Protected by JWT
router.post('/services/add',);

// render update service page - Protected by JWT
router.get('/services/edit/:id',);

// Update a service - Protected by JWT
router.post('/services/edit/:id',);

// Delete a service - Protected by JWT
router.get('/services/delete/:id',);


module.exports = router;
