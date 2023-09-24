const fs = require('fs');
const path = require('path')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// implement readData function
const readDataFromFile = (filePath) => {
	let absolute_path = path.join(__dirname, filePath);

	console.log(absolute_path)
    return JSON.parse(fs.readFileSync(absolute_path));
	// console.log("################",lola);
	// return lola;
};

// implement writeData function
const writeDataToFile = (filePath, data) => {
	let absolute_path = path.join(__dirname, filePath);
    
	// read file
	const file = fs.readFileSync(absolute_path)

	//check if file is empty
	if (file.length == 0) {
		//add data to json file
		fs.writeFileSync(absolute_path, JSON.stringify([data], null, 2))
	} else {
		//append data to jso file
		const json = JSON.parse(file.toString())

		//add json element to json object
		json.push(data);
		fs.writeFileSync(absolute_path, JSON.stringify(json, null, 2), err => {
			if (err)
				return new Error(err.message);
			console.log(data)
			return {data : data}
		})
	}
	// console.log(data);
    // fs.appendFile(absolute_path, JSON.stringify(data, null, 2), err => {
	// 	if (err) {
	// 		return new Error(err.message);
	// 	}
	// 	// done!
	// 	console.log(data);
	// 	return {data : data}
	// });
};

const validationData = [
	body('email')
		.trim()
		.isEmail()
		.normalizeEmail()
		.withMessage('Not valid Email'),
	body('password')
		.trim()
		.isLength({ min: 2 })
		.withMessage('Password must be at least 8 characters'),
	body('password-repeat')
		.trim()
		.custom((repeated_pwd, {req})=> {
			// console.log(repeated_pwd, req.body.password);
			if (repeated_pwd !== req.body.password)
				return Promise.reject("Password mismatch!")
			return true
		})
];

const registerController = (req, res) => {
		// Check for validation errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			// return res.status(400).json({ errors: errors.array() });
			res.render('register', { errors: errors.array() });
		}

		
		const saltRounds = 10;
		const { email, password } = req.body;
		
		// Check if the user already exist
		const user = findUser(email, "../data/users.json");
		
		if (user)
		{
			// console.log(errors)
			// errors.push({msg:"User already exist."})
			res.render('register', { errors: [{msg:"User already exist."}] });
		}
		bcrypt.hash(password, saltRounds, function(err, hash) {
			// Store hash in your password DB.
			console.log(writeDataToFile("../data/users.json", {email, hash}));
		});
		
		res.render('login', { message: 'Please LogIn', errors : ""})

		// Sanitize the user input
		//   const sanitizedData = {
			//     email: xss(email),
			//     password: xss(password),
			//   };

			// Store the sanitized data in a database or perform further actions
			// Return success response
			//   return res.status(200).json({ message: 'User registered successfully' });
	};

const findUser = (email, filePath) => {
	let users = readDataFromFile(filePath);

	console.log("findUSer : ",users)
	console.log(users?.find( element => element.email === email))
	return users?.find( element => element.email === email)
}

module.exports = {
    readDataFromFile,
    writeDataToFile,
	validationData,
	registerController,
	findUser
};
