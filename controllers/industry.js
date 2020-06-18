const db = require("../config/db.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var dateformat = require('dateformat');

exports.get = async(req,res) => {
	
	try{

		db.query("SELECT * FROM job_industry", async(error,results) => {
			
			if(results){
				var result = JSON.parse(JSON.stringify(results));
				res.render('./industry/allJobIndustry',{
					result: result
				});
			}
			
		})
	}catch(error){
		console.log(error);
	}

}
exports.add = async(req,res) => {
	
	res.render("./industry/addJobIndustry",{
		success: req.flash("success")
	});

}
exports.save = async(req,res) => {
	
	try{
		//getting data from request body
		const {name} = req.body;
		//check if one of them is null or not ... if null throw error
		if( !name ){
			req.flash("error","Please provide All Job Industry details.");
			res.redirect('/job/industry/add');
		}

		
		db.query("SELECT * FROM job_industry WHERE name = ?", [name], async(error,results) => {
			//console.log(results);
			if( !results ) {
				req.flash("error","Details are already Entered!");
				res.redirect('/job/industry/add');
			}
			else{
				console.log(results);
				const job_industry_data = {
					"name": req.body.name, 
					"created_at" : dateformat(new Date(),"yyyy-mm-dd h:M:s")
				};
				console.log(job_industry_data);

				db.query(
					"INSERT INTO `job_industry` SET ?",
					job_industry_data,
					async(error,results) => {
						if(error){
							console.log(error);
						}else{
							req.flash("success","Data Inserted Successfully!");
							res.redirect('/job/industry/all');
						}
					});
				
			}
		});
		
	}catch(error){
		console.log(error);
	}

}
exports.edit = (req,res) =>{
	try{
		db.query("SELECT * FROM job_industry WHERE id = ?",[req.params.id], (error,result) => {
			
			if(result){
				//var result = JSON.parse(JSON.stringify(result));
				//console.log(result[0].id);
				res.render('./industry/editJobIndustry',{
					result: result[0]
				});
			}else{
				req.flash("error","error");
				res.redirect('/job/industry/edit/'+req.params.id);
			}
			
		})
	}catch(error){
		console.log(error);
	}
}
exports.update = async(req,res) => {
	
	try{
		
		console.log(req.body.id);
		const job_industry_data_for_update = {
									"name": req.body.name, 
									"updated_at" : dateformat(new Date(),"yyyy-mm-dd h:M:s")
								};
		console.log(job_industry_data_for_update);
		db.query("UPDATE `job_industry` SET ? WHERE id = ?",[job_industry_data_for_update,req.body.id], async(error,results) => {
		
			if(results){

				req.flash("success","Data Updated Successfully!");
				res.redirect('/job/industry/edit/' + req.body.id);
			}else{

				req.flash("error","Error occurs on Data Updates!");
				res.redirect('/job/industry/edit/' + req.body.id);
			}
		});
			
		
		
	}catch(error){
		console.log(error);
	}

}
