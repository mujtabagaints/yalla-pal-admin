const db = require("../config/db.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async(req,res) => {
	
	try{
		const {email, password } = req.body;
		if( !email || !password ){
			// res.message ="fff";
			// return res.redirect('/');
			return res.status(400).render('login', {
				error: "Please provide Email & Password."
			})
		}
		db.query("SELECT * FROM user WHERE email = ?", [email], async(error,results) => {
			//console.log(results);
			if( !results || !(await bcrypt.compare(password, results[0].password) ) ) {
				res.status(401).render('login',{
					error: "Email or Passord is incorrect"
				})
			}
			else{
				const id = results[0].id;
				const token = jwt.sign({ id }, process.env.JWT_SECRET, {
					expiresIn: process.env.JWT_EXPIRES_IN
				});
				//console.log(token);
				const cookiesOptions = {
					expires: new Date(
						Date.now() + process.env.JWT_COOKIES_EXPIRES * 24 * 60 * 60 * 1000
					),
					httpOnly: true
				}
				res.cookie('login jwt', token, cookiesOptions);
				req.session.loggedin = true;
				req.session.username = results[0].name;
				res.redirect('/dashboard');
				// //res.render('dashboard');
				// res.render('dashboard',{
				// 	successMsg: "SUCCESS!"
				// });
			}
		})
	}catch(error){
		console.log(error);
	}

}
