const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { readDataFromFile, writeDataToFile } = require('../handlers/dataHandler');
const router = express.Router();
const SECRET_KEY = '';  

// render register page
router.get('/register', (req, res) => {
	res.render('register', {errors : ""});
});

// implement register route
// * https://www.youtube.com/watch?v=UUgDpf6rirw
router.post('/register', [
	body('email')
	.trim()
	.isEmail()
	.normalizeEmail()
	.withMessage('Not valid Email'),
	body('password')
	.trim()
	.isLength({ min: 8 })
	.withMessage('Password must be at least 8 characters'),
	body('password-repeat')
	.trim()
	.custom((repeated_pwd, {req})=> {
		// console.log(repeated_pwd, req.body.password);
		if (repeated_pwd !== req.body.password)
			return Promise.reject("Password mismatch!")
		return true
	})
], (req, res) => {
	// Check for validation errors
	// try {

		const errors = validationResult(req);
	// }
	// catch(err)
	// {
	// 	console.log(err.message)
	// 	res.render('register', { errors: errors.array() });
	// }
	
	if (!errors.isEmpty()) {
		console.log(errors);
		// return res.status(400).json({ errors: errors.array() });
		res.render('register', { errors: errors.array() });
	}
	// Sanitize the user input
	const saltRounds = 10;
	const { email, password } = req.body;
	bcrypt.hash(password, saltRounds, function(err, hash) {
		// Store hash in your password DB.
		// console.log(password, hash)
		console.log(writeDataToFile("../data/users.json", {email, hash}));
	});
	res.render('login', { message: 'Please LogIn', errors : ""})
	//   const sanitizedData = {
		//     email: xss(email),
		//     password: xss(password),
		//   };

		// Store the sanitized data in a database or perform further actions
		// Return success response
		//   return res.status(200).json({ message: 'User registered successfully' });
	}
	);
	
	// render login page
	router.get('/login', );
	
	// implement login route
router.post('/login', );

// implement logout route
router.get('/logout',);

module.exports = router;
