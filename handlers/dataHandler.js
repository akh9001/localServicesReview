const fs = require('fs');
const path = require('path')
const { body} = require('express-validator');

// implement readData function
const readDataFromFile = (filePath) => {
	let absolute_path = path.join(__dirname, filePath);

	console.log(absolute_path)
    return JSON.parse(fs.readFileSync(absolute_path));
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
};

// * https://www.youtube.com/watch?v=UUgDpf6rirw [custom function]
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



module.exports = {
    readDataFromFile,
    writeDataToFile,
	validationData
};
