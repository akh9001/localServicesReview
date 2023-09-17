const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));


app.set('view engine', 'ejs');


app.use(cookieParser());


app.use(userRoutes);
app.use(serviceRoutes);

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
