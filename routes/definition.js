var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../model/user.js');
var Definition = sequelize.import('../models/definition.js');

router.post('/', function(req, res){
	var description = req.body.definition.desc;
	
	Definition

		.create({})
})