const db = require("../config/db.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.get = async(req,res) => {
	
	try{

		db.query("SELECT * FROM property", async(error,results) => {
			
			console.log(results);
			
		})
	}catch(error){
		console.log(error);
	}

}
exports.add = async(req,res) => {
	
	res.render("./job/addJob");

}
