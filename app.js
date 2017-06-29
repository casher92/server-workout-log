require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js')
var User = sequelize.import('./models/user')

app.use('/api/test', function(req, res){
	res.send("Hello World");
});

app.listen(3000, function(){
	console.log("app is open on 3000!");
});






User.sync();
//User({force : true}); //drops the table 

app.use(bodyParser.json());

app.use(require('./middleware/headers'));

app.use(require('./middleware/validate-session'))

app.use('/api/user', require('./routes/user'));

app.use('/api/login', require('./routes/session'));

app.post('/api/user', function(req, res){
	var username = req.body.user.username;
	var pass = req.body.user.password;  //TODO : hash the password


	//match the model we create above
	//Sequelize - take the user model and go out to the db and create this:
	User.create({
		username : username,
		passwordhash : ""
	}).then(
			function createSuccess(user){
				res.json({
					user : user,
					message : "create"
				});
			},
			function createError(err){
				res.send(500, err.message);
			}
	);

});

