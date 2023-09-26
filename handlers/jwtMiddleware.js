require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = ''; 

module.exports = (req, res, next) => {
    // implement jwt middleware
		// * get the token
		// * verify if it s the correct user
		// * return it back.
		// const authHeader = req.headers['authorization']
		// const token = authHeader && authHeader.split(' ')[1]
		// * Retrieve the Token from a Cookie
		// console.log(req.cookies);
		token = req.cookies && req.cookies?.authToken;
		
		if (!token)
			res.render('login', {errors : [{msg : "Please login"}] });
			// return res.sendStatus(401) 
		//? 401 Unauthorized response status code indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource.

		// * Verify the token :
		else
		{
			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
				if (err)
					return res.sendStatus(403)
				// ? 403 Forbidden response status code indicates that the server understands the request but refuses to authorize it.
				
				req.user = user;
				next();
			})
		}
};
