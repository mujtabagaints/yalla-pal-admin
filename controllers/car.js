const db = require("../config/db.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var dateformat = require('dateformat');

exports.get = async(req,res) => {
	
	try{

		db.query("SELECT * FROM car", (error,results) => {
			
			if(results){
				var result = JSON.parse(JSON.stringify(results));
				console.log(result);
				res.render('./car/allCar',{
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
	
	res.render("./car/addCar",{
				success: req.flash("success"),
				error: req.flash("error"),
			});

}
exports.save = (req,res) => {

	try{
		//getting data from request body
		const {model, seat, engine, pre_owned, description } = req.body;
		//check if one of them is null or not ... if null throw error
		if( !model || !seat || !engine || !pre_owned || !description ){
			req.flash("error","Please provide All Job details.");
			res.redirect('/car/add');
		}
		//check if request body has file ... if not throw an error
		if (!req.files){
			req.flash("error","No Image was provided!");
			res.redirect('/car/add');
		}
		//console.log(req.files.img);
		var file = req.files.img;
		var img_name = file.name;

		if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif" ){
                                 
            file.mv('./public/theme/media/car/'+img_name, function(err) {
                             
	            if (err){
	                req.flash("error","Sorry! File wasnot uploaded. Error Occured.");
					res.redirect('/car/add');
				}else{
      					db.query("SELECT * FROM car WHERE model = ? && seat = ? && engine = ? && pre_owned = ?", [model,seat,engine,pre_owned], async(error,results) => {
						console.log(results);
						if( !results ) {
							req.flash("error","Details are already Entered!");
							res.redirect('/car/add');
						}
						else{
							console.log(results);
							const car_data = {
								"model": req.body.model, 
								"seat": req.body.seat, 
								"engine": req.body.engine, 
								"pre_owned": req.body.pre_owned, 
								"img" : img_name,
								"description": req.body.description ,
								"created_at" : dateformat(new Date(),"yyyy-mm-dd h:M:s")
							};
							console.log(car_data);

							db.query(
								"INSERT INTO `car` SET ?",
								car_data,
								async(error,results) => {
									if(error){
										console.log(error);
									}else{
										req.flash("success","Data Inserted Successfully!");
										res.redirect('/car/all');
									}
								});
							
						}
					})
      			}
			});
        } else {
            req.flash("error","error");
			res.redirect('/car/add');
        }
		
	}catch(error){
		console.log(error);
	}

}
exports.edit = (req,res) => {
	
	try{
		db.query("SELECT * FROM car WHERE id = ?",[req.params.id], (error,result) => {
			
			if(result){
				//console.log(result[0]);
				res.render('./car/editCar',{
					result: result[0],
					success: req.flash("success"),
					error: req.flash("error"),
				});
				
			}else{
				req.flash("error","error");
				res.redirect('/car/edit/'+req.params.id);
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
			const car_data_for_update = {
								"model": req.body.model, 
								"seat": req.body.seat, 
								"engine": req.body.engine, 
								"pre_owned": req.body.pre_owned, 
								"description": req.body.description ,
								"updated_at" : dateformat(new Date(),"yyyy-mm-dd h:M:s")
							};
			console.log(car_data_for_update);
			db.query("UPDATE `car` SET ? WHERE id = ?",[car_data_for_update,req.body.id], (error,results) => {
			
				if(results){
					req.flash("success","Data Updated Successfully!");
					res.redirect('/car/edit/' + req.body.id);
				}if(error){
					//console.log(error);
					req.flash("error","Error occurs on Data Updates!");
					res.redirect('/car/edit/' + req.body.id);
				}
			});
			
		}else{
			//console.log(req.files.img);
			var file = req.files.img;
			var img_name = file.name;

			if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif" ){
	                                 
	            file.mv('./public/theme/media/car/'+img_name, function(err) {
	                             
		            if (err){
		                req.flash("error","Sorry! File wasnot uploaded. Error Occured.");
						res.redirect('/car/edit/' + req.body.id);
					}else{
						const event_data_for_update = {
														"model": req.body.model, 
														"seat": req.body.seat, 
														"engine": req.body.engine, 
														"pre_owned": req.body.pre_owned, 
														"img" : img_name,
														"description": req.body.description ,
														"updated_at" : dateformat(new Date(),"yyyy-mm-dd h:M:s")
													};
						console.log(event_data_for_update);
	      				db.query("UPDATE `car` SET ? WHERE id = ?",[event_data_for_update,req.body.id], async(error,results) => {
				
							if(results){

								req.flash("success","Data Updated Successfully!");
								res.redirect('/car/edit/' + req.body.id);
							}else{

								req.flash("error","Error occurs on Data Updates!");
								res.redirect('/car/edit/' + req.body.id);
							}
						});
	      			}
				});
	        } else {
	            req.flash("error","error");
				res.redirect('/car/edit' + req.body.id);
	        }
	    }
		
	}catch(error){
		console.log(error);
	}

}
