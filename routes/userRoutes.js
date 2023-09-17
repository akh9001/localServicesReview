const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { readDataFromFile, writeDataToFile } = require('../handlers/dataHandler');

const router = express.Router();
const SECRET_KEY = '';  

// render register page
router.get('/register', );

// implement register route
router.post('/register', );

// render login page
router.get('/login', );

// implement login route
router.post('/login', );

// implement logout route
router.get('/logout',);

module.exports = router;
