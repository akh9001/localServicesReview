const express = require('express');
const jwtMiddleware = require('../handlers/jwtMiddleware');
const { body, validationResult } = require('express-validator');
const { readDataFromFile, writeDataToFile } = require('../handlers/dataHandler');
const router = express.Router();

// get home page and display all services from services.json
router.get('/', (req, res) => {
	// const services = readDataFromFile("../data/services.json");
	res.render("services-dashboard", {services: "", errors: ""})
});

// get service dashboard page - Protected by JWT
router.get('/services', jwtMiddleware, (req, res) => {
	const services = readDataFromFile("../data/services.json");
	// console.log("services : ", services)
	res.render("services-dashboard", {services: services, errors: ""})
});

// Add a new service - Protected by JWT
router.post('/services/add', jwtMiddleware,[
	body('title').trim().isLength({ min: 8, max: 8 }).withMessage('title must be 8 characters'),
	body('description').trim().notEmpty().withMessage('description is required')
], (req, res) => {
	// console.log()
	const errors = validationResult(req);
	const services = readDataFromFile("../data/services.json");
	if (!errors.isEmpty()) {
		console.log(errors);
		// return res.status(400).json({ errors: errors.array() });
		res.render('services-dashboard', {services: services, errors: errors.array() });
	}
	else
	{
		const {title, description} = req.body;
		const id = services.length + 1;
		console.log(id);
		writeDataToFile("../data/services.json", {id: id, title: title, description:description})
		// res.render('services-dashboard', { services: services, errors: ""})
		res.redirect('/services');
	}
});

// render update service page - Protected by JWT
router.get('/services/edit/:id',jwtMiddleware);

// Update a service - Protected by JWT
router.post('/services/edit/:id',jwtMiddleware);

// Delete a service - Protected by JWT
router.get('/services/delete/:id',jwtMiddleware,);


module.exports = router;
