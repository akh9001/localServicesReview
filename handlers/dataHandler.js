const fs = require('fs');
const path = require('path')

// implement readData function
const readDataFromFile = (filePath) => {

    fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			return new Error(err.message);
		}
		console.log(data);
		return {data : data}
	});
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

module.exports = {
    readDataFromFile,
    writeDataToFile
};
