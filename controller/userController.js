const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator')
const {writeDataToFile, readDataFromFile} = require('../handlers/dataHandler')


const registerController = async (req, res) => {
		// Check for validation errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			// return res.status(400).json({ errors: errors.array() });
			res.render('register', { errors: errors.array() });
		}

		
		const saltRounds = 10;
		const { email, password } = req.body;
		
		// Sanitize the user input
		//   const sanitizedData = {
			//     email: xss(email),
			//     password: xss(password),
			//   };

		// Check if the user already exist
		const user = findUser(email, "../data/users.json");
		
		if (user)
			res.render('register', { errors: [{msg:"User already exist."}] });
		else
		{
			try
			{
				// Hash the password
				const salt = await bcrypt.genSalt(saltRounds);
				const hashedPassword = await bcrypt.hash(password, salt)
				// Store hash in your password DB.
				writeDataToFile("../data/users.json", {email: email, password:hashedPassword})
				res.render('login', { message: 'Please LogIn', errors : ""})
			}
			catch (err)
			{
				res.render('register', { errors: [{msg:err.message}] });
			}
			// bcrypt.hash(password, saltRounds, function(err, hash) {
			// 	// Store hash in your password DB.
			// 	console.log(writeDataToFile("../data/users.json", {email, hash}));
			// });
		}

	};

const findUser = (email, filePath) => {
	let users = readDataFromFile(filePath);

	return users?.find( element => element.email === email)
}

module.exports = {
	registerController,
	findUser
};
