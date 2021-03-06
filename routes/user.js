var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('api/user', function(req, res){
	var username = req.body.user.username;
	var pass = req.body.user.password;  //TODO : hash the password
	

	//match the model we create above
	//Sequelize - take the user model and go out to the db and create this:
	User.create({
		username : username,
		passwordhash : bcrypt.hashSync(pass, 10)
	}).then(
			function createSuccess(user){
				var token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
				res.json({
					user : user,
					message : "create",
					sessionToken: token
				})
			},
			function createError(err){
				res.send(500, err.message);
			}
	);

});

module.exports = router;
