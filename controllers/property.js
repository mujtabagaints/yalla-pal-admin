const db = require("../config/db.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var dateformat = require('dateformat');

exports.get = (req,res) => {
	
	try{

		db.query("SELECT * FROM property", (error,results) => {
			
			if(results){
				var result = JSON.parse(JSON.stringify(results));
				res.render('./property/allProperty',{
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
exports.add = async(req,res) => {
	
	res.render("./property/addProperty",{ 
									success: req.flash("success"),
									error: req.flash("error"),
								});
	
}

exports.save = (req,res) => {

	try{
		//getting data from request body
		const {name, price, area, beds, bath, description } = req.body;
		//check if one of them is null or not ... if null throw error
		if( !name || !price || !area || !beds || !bath || !description ){
			req.flash("error","Please provide All Property details.");
			res.redirect('/property/add');
		}
		//check if request body has file ... if not throw an error
		if (!req.files){
			req.flash("error","No Image was provided!");
			res.redirect('/property/add');
		}
		//console.log(req.files.img);
		var file = req.files.img;
		var img_name = file.name;

		if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif" ){
                                 
            file.mv('./public/theme/media/property/'+img_name, function(err) {
                             
	            if (err){
	                req.flash("error","Sorry! File wasnot uploaded. Error Occured.");
					res.redirect('/property/add');
				}else{
      					db.query("SELECT * FROM property WHERE name = ? && price = ? && area = ?", [name,price,area], async(error,results) => {
						//console.log(results);
						if( !results ) {
							req.flash("error","Details are already Entered!");
							res.redirect('/property/add');
						}
						else{
							console.log(results);
							const propertyData = {
								"name": req.body.name, 
								"price": req.body.price, 
								"area": req.body.area, 
								"img" : img_name,
								"bed": req.body.beds, 
								"bath": req.body.bath, 
								"description": req.body.description ,
								"created_at" : dateformat(new Date(),"yyyy-mm-dd h:M:s")
							};
							console.log(propertyData);

							db.query(
								"INSERT INTO `property` SET ?",
								propertyData,
								async(error,results) => {
									if(error){
										console.log(error);
									}else{
										req.flash("success","Data Inserted Successfully!");
										res.redirect('/property/all');
									}
								});
							
						}
					})
      			}
			});
        } else {
            req.flash("error","error");
			res.redirect('/property/add');
        }
		
	}catch(error){
		console.log(error);
	}

}
exports.edit = async(req,res) => {
	
	try{
		db.query("SELECT * FROM property WHERE id = ?",[req.params.id], (error,result) => {
			
			if(result){
				//var result = JSON.parse(JSON.stringify(result));
				//console.log(result[0].id);
				res.render('./property/editProperty',{
					result: result[0],
					success: req.flash("success"),
					error: req.flash("error"),
				});
			}else{
				req.flash("error","error");
				res.redirect('/property/edit/'+req.params.id);
			}
			
		})
	}catch(error){
		console.log(error);
	}

}
exports.update = async(req,res) => {
	
	try{
		
		console.log(req.body.id);

		//check if request body has file ... if not throw an error
		if (!req.files){
			const propertyDataForUpdate = {
										"name": req.body.name, 
										"price": req.body.price, 
										"area": req.body.area, 
										"bed": req.body.beds, 
										"bath": req.body.bath, 
										"description": req.body.description ,
										"updated_at" : dateformat(new Date(),"yyyy-mm-dd h:M:s")
									};
			console.log(propertyDataForUpdate);
			db.query("UPDATE `property` SET ? WHERE id = ?",[propertyDataForUpdate,req.body.id], async(error,results) => {
			
				if(results){

					req.flash("success","Data Updated Successfully!");
					res.redirect('/property/edit/' + req.body.id);
				}else{

					req.flash("error","Error occurs on Data Updates!");
					res.redirect('/property/edit/' + req.body.id);
				}
			});
			
		}else{
			//console.log(req.files.img);
			var file = req.files.img;
			var img_name = file.name;

			if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif" ){
	                                 
	            file.mv('./public/theme/media/property/'+img_name, function(err) {
	                             
		            if (err){
		                req.flash("error","Sorry! File wasnot uploaded. Error Occured.");
						res.redirect('/property/edit/'+ req.body.id);
					}else{
						const propertyDataForUpdate = {
										"name": req.body.name, 
										"price": req.body.price, 
										"area": req.body.area, 
										"img" : img_name,
										"bed": req.body.beds, 
										"bath": req.body.bath, 
										"description": req.body.description ,
										"updated_at" : dateformat(new Date(),"yyyy-mm-dd h:M:s")
									};
						console.log(propertyDataForUpdate);
	      				db.query("UPDATE `property` SET ? WHERE id = ?",[propertyDataForUpdate,req.body.id], async(error,results) => {
				
							if(results){

								req.flash("success","Data Updated Successfully!");
								res.redirect('/property/edit/' + req.body.id);
							}else{

								req.flash("error","Error occurs on Data Updates!");
								res.redirect('/property/edit/' + req.body.id);
							}
						});
	      			}
				});
	        } else {
	            req.flash("error","error");
				res.redirect('/property/edit' + req.body.id);
	        }
	    }
		
	}catch(error){
		console.log(error);
	}

}
