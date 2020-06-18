const db = require("../config/db.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var dateformat = require('dateformat');

exports.get = (req,res) => {
	
	try{

		db.query("SELECT j.company_name as company_name,j.title as title,ji.name as job_industry, j.id as id, j.city as city, j.country as country,education_level as education_level, career_level as career_level FROM job j INNER JOIN job_industry ji on j.job_industry = ji.id", (error,results) => {
			
			if(results){
				var result = JSON.parse(JSON.stringify(results));
				res.render('./job/allJob',{
					result: result,
					success: req.flash("success"),
					error: req.flash("error"),
				});
			}
			
		})
	}catch(error){
		console.log(error);
	}

}
exports.add = (req,res) => {

	db.query("SELECT * FROM job_industry", (error,results) => {
			
		if(results){
			var result = JSON.parse(JSON.stringify(results));
			res.render('./job/addJob',{
				result: result,
				success: req.flash("success"),
				error: req.flash("error"),
			});
		}
		
	});

}
exports.save = (req,res) => {

	try{
		//getting data from request body
		const {company_name, title, country, city, job_industry, description } = req.body;
		//check if one of them is null or not ... if null throw error
		if( !company_name || !title || !country || !city || !job_industry || !description ){
			req.flash("error","Please provide All Job details.");
			res.redirect('/job/add');
		}
		//check if request body has file ... if not throw an error
		if (!req.files){
			req.flash("error","No Image was provided!");
			res.redirect('/job/add');
		}
		console.log(req.files.img);
		var file = req.files.img;
		var img_name = file.name;

		if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif" ){
                                 
            file.mv('./public/theme/media/job/'+img_name, function(err) {
                             
	            if (err){
	                req.flash("error","Sorry! File wasnot uploaded. Error Occured.");
					res.redirect('/job/add');
				}else{
      					db.query("SELECT * FROM job WHERE company_name = ? && title = ? && country = ? && city = ? && job_industry = ?", [company_name,title,country,city,job_industry], async(error,results) => {
						//console.log(results);
						if( !results ) {
							req.flash("error","Details are already Entered!");
							res.redirect('/job/add');
						}
						else{
							console.log(results);
							const job_data = {
								"company_name": req.body.company_name, 
								"title": req.body.title, 
								"country": req.body.country, 
								"city": req.body.city, 
								"img" : img_name,
								"job_industry": req.body.job_industry, 
								"career_level": req.body.career_level ,
								"education_level": req.body.education_level ,
								"experience": req.body.experience ,
								"employment_type": req.body.employment_type ,
								"salary_range": req.body.salary_range ,
								"description": req.body.description ,
								"created_at" : dateformat(new Date(),"yyyy-mm-dd h:M:s")
							};
							console.log(job_data);

							db.query(
								"INSERT INTO `job` SET ?",
								job_data,
								async(error,results) => {
									if(error){
										console.log(error);
									}else{
										req.flash("success","Data Inserted Successfully!");
										res.redirect('/job/all');
									}
								});
							
						}
					})
      			}
			});
        } else {
            req.flash("error","error");
			res.redirect('/job/add');
        }
		
	}catch(error){
		console.log(error);
	}

}
exports.edit = (req,res) => {
	
	try{
		db.query("SELECT * FROM job WHERE id = ?",[req.params.id], (error,result) => {
			
			if(result){
				db.query("SELECT * FROM job_industry", (error,job_industry_results) => {
			
					if(job_industry_results){
						var job_industry = JSON.parse(JSON.stringify(job_industry_results));
						//console.log(result[0]);
						res.render('./job/editJob',{
							result: result[0],
							job_industry: job_industry,
							success: req.flash("success"),
							error: req.flash("error"),
						});
					}
					
				});
				
			}else{
				req.flash("error","error");
				res.redirect('/job/edit/'+req.params.id);
			}
			
		});
	}catch(error){
		console.log(error);
	}

}
exports.update = (req,res) => {
	
	try{
		
		console.log(req.body.id);

		//check if request body has file ... if not throw an error
		if (!req.files){
			const job_data_for_update = {
										"company_name": req.body.company_name, 
										"title": req.body.title, 
										"country": req.body.country, 
										"city": req.body.city, 
										"job_industry": req.body.job_industry, 
										"description": req.body.description ,
										"career_level": req.body.career_level ,
										"education_level": req.body.education_level ,
										"experience": req.body.experience ,
										"employment_type": req.body.employment_type ,
										"salary_range": req.body.salary_range ,
										"updated_at" : dateformat(new Date(),"yyyy-mm-dd h:M:s")
									};
			console.log(job_data_for_update);
			db.query("UPDATE `job` SET ? WHERE id = ?",[job_data_for_update,req.body.id], (error,results) => {
			
				if(results){
					req.flash("success","Data Updated Successfully!");
					res.redirect('/job/edit/' + req.body.id);
				}if(error){
					//console.log(error);
					req.flash("error","Error occurs on Data Updates!");
					res.redirect('/job/edit/' + req.body.id);
				}
			});
			
		}else{
			//console.log(req.files.img);
			var file = req.files.img;
			var img_name = file.name;

			if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif" ){
	                                 
	            file.mv('./public/theme/media/job/'+img_name, function(err) {
	                             
		            if (err){
		                req.flash("error","Sorry! File wasnot uploaded. Error Occured.");
						res.redirect('/job/edit/' + req.body.id);
					}else{
						const job_data_for_update = {
														"company_name": req.body.company_name, 
														"title": req.body.title, 
														"country": req.body.country, 
														"city": req.body.city, 
														"img" : img_name,
														"job_industry": req.body.job_industry, 
														"description": req.body.description ,
														"career_level": req.body.career_level ,
														"education_level": req.body.education_level ,
														"experience": req.body.experience ,
														"employment_type": req.body.employment_type ,
														"salary_range": req.body.salary_range ,
														"udpated_at" : dateformat(new Date(),"yyyy-mm-dd h:M:s")
													};
						console.log(job_data_for_update);
	      				db.query("UPDATE `job` SET ? WHERE id = ?",[job_data_for_update,req.body.id], async(error,results) => {
				
							if(results){

								req.flash("success","Data Updated Successfully!");
								res.redirect('/job/edit/' + req.body.id);
							}else{

								req.flash("error","Error occurs on Data Updates!");
								res.redirect('/job/edit/' + req.body.id);
							}
						});
	      			}
				});
	        } else {
	            req.flash("error","error");
				res.redirect('/job/edit' + req.body.id);
	        }
	    }
		
	}catch(error){
		console.log(error);
	}

}
