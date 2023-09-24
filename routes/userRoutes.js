const express = require('express');
const jwt = require('jsonwebtoken');
const {validationData} = require('../handlers/dataHandler');
const {registerController, login} = require('../controller/userController')
const router = express.Router();
const SECRET_KEY = '';  

// render register page
router.get('/register', (req, res) => {
	res.render('register', {errors : "" });
});

// implement register route
router.post('/register', validationData, registerController
	);
	
// render login page
router.get('/login', (req, res) => {
	res.render('login', {errors : "" });
});
	
// implement login route
router.post('/login', login);

// implement logout route
router.get('/logout',);

module.exports = router;
