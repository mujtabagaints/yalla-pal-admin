const db = require("../config/db.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var dateformat = require('dateformat');

exports.get = (req,res) => {
	
	try{

		db.query("SELECT e.name as event_name,et.name as tag_name,e.location as location, e.id as id FROM event e INNER JOIN event_tag et on e.tag = et.id", (error,results) => {
			
			if(results){
				var result = JSON.parse(JSON.stringify(results));
				console.log(result);
				res.render('./events/allEvent',{
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
	
	db.query("SELECT * FROM event_tag", (error,results) => {
			
		if(results){
			var result = JSON.parse(JSON.stringify(results));
			res.render('./events/addEvent',{
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
		const {name, date, location, tag, description } = req.body;
		//check if one of them is null or not ... if null throw error
		if( !name || !date || !location || !tag || !description ){
			req.flash("error","Please provide All Job details.");
			res.redirect('/event/add');
		}
		//check if request body has file ... if not throw an error
		if (!req.files){
			req.flash("error","No Image was provided!");
			res.redirect('/event/add');
		}
		console.log(req.files.img);
		var file = req.files.img;
		var img_name = file.name;

		if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif" ){
                                 
            file.mv('./public/theme/media/event/'+img_name, function(err) {
                             
	            if (err){
	                req.flash("error","Sorry! File wasnot uploaded. Error Occured.");
					res.redirect('/event/add');
				}else{
      					db.query("SELECT * FROM event WHERE name = ? && date = ? && location = ? && tag = ?", [name,date,location,tag], async(error,results) => {
						//console.log(results);
						if( !results ) {
							req.flash("error","Details are already Entered!");
							res.redirect('/event/add');
						}
						else{
							console.log(results);
							const event_data = {
								"name": req.body.name, 
								"date": req.body.date, 
								"location": req.body.location, 
								"tag": req.body.tag, 
								"img" : img_name,
								"description": req.body.description ,
								"created_at" : dateformat(new Date(),"yyyy-mm-dd h:M:s")
							};
							console.log(event_data);

							db.query(
								"INSERT INTO `event` SET ?",
								event_data,
								async(error,results) => {
									if(error){
										console.log(error);
									}else{
										req.flash("success","Data Inserted Successfully!");
										res.redirect('/event/all');
									}
								});
							
						}
					})
      			}
			});
        } else {
            req.flash("error","error");
			res.redirect('/event/add');
        }
		
	}catch(error){
		console.log(error);
	}

}
exports.edit = (req,res) => {
	
	try{
		db.query("SELECT * FROM event WHERE id = ?",[req.params.id], (error,result) => {
			
			if(result){
				db.query("SELECT * FROM event_tag", (error,event_tag) => {
			
					if(event_tag){
						var job_industry = JSON.parse(JSON.stringify(event_tag));
						//console.log(result);
						res.render('./events/editEvent',{
							result: result[0],
							date: dateformat(result[0].date,'mm/dd/yyyy'),
							event_tag: event_tag,
							success: req.flash("success"),
							error: req.flash("error"),
						});
					}
					
				});
				
			}else{
				req.flash("error","error");
				res.redirect('/event/edit/'+req.params.id);
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
			const event_data_for_update = {
										"name": req.body.name, 
										"date": req.body.date, 
										"location": req.body.location, 
										"tag": req.body.tag, 
										"description": req.body.description ,
										"updated_at" : dateformat(new Date(),"yyyy-mm-dd h:M:s")
									};
			console.log(event_data_for_update);
			db.query("UPDATE `event` SET ? WHERE id = ?",[event_data_for_update,req.body.id], (error,results) => {
			
				if(results){
					req.flash("success","Data Updated Successfully!");
					res.redirect('/event/edit/' + req.body.id);
				}if(error){
					//console.log(error);
					req.flash("error","Error occurs on Data Updates!");
					res.redirect('/event/edit/' + req.body.id);
				}
			});
			
		}else{
			//console.log(req.files.img);
			var file = req.files.img;
			var img_name = file.name;

			if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif" ){
	                                 
	            file.mv('./public/theme/media/event/'+img_name, function(err) {
	                             
		            if (err){
		                req.flash("error","Sorry! File wasnot uploaded. Error Occured.");
						res.redirect('/event/edit/' + req.body.id);
					}else{
						const event_data_for_update = {
														"name": req.body.name, 
														"date": req.body.date, 
														"location": req.body.location, 
														"tag": req.body.tag, 
														"img": img_name, 
														"description": req.body.description ,
														"updated_at" : dateformat(new Date(),"yyyy-mm-dd h:M:s")
													};
						console.log(event_data_for_update);
	      				db.query("UPDATE `event` SET ? WHERE id = ?",[event_data_for_update,req.body.id], async(error,results) => {
				
							if(results){

								req.flash("success","Data Updated Successfully!");
								res.redirect('/event/edit/' + req.body.id);
							}else{

								req.flash("error","Error occurs on Data Updates!");
								res.redirect('/event/edit/' + req.body.id);
							}
						});
	      			}
				});
	        } else {
	            req.flash("error","error");
				res.redirect('/event/edit' + req.body.id);
	        }
	    }
		
	}catch(error){
		console.log(error);
	}

}
exports.show = (req,res) => {

	const match = {}
	//console.log(req.query.tag);
	if(req.query.tag){
        match.tag = req.query.tag === 'true';
        //console.log(req.query.tag);
        try{

			db.query("SELECT e.name as event_name,et.name as tag_name,e.location as location, e.id as id,e.date as event_date,e.img as img FROM event e INNER JOIN event_tag et on e.tag = et.id WHERE et.name = ?",[req.query.tag], (error,results) => {
				console.log(results);
				if(results != 0){
					var result = JSON.parse(JSON.stringify(results));
					//res.send(result);
					//res.redirect('/theme/event/', result);
					res.render('./theme/event',{
						result: result
					});
				}else{
					res.render('./theme/event',{
						message: "No Data Exists on Selection Criteria."
					});
				}
				
			})
		}catch(error){
			console.log(error);
		}
    }else if(req.query.month){
        match.month = req.query.month === 'true';
        //console.log(req.query.tag);
        try{

			db.query("SELECT e.name as event_name,et.name as tag_name,e.location as location, e.id as id,e.date as event_date,e.img as img FROM event e INNER JOIN event_tag et on e.tag = et.id WHERE MONTH(e.date) = ?",[req.query.month], (error,results) => {
				
				if(results != 0){
					var result = JSON.parse(JSON.stringify(results));
					//res.send(result);
					//res.redirect('/theme/event/', result);
					res.render('./theme/event',{
						result: result
					});
				}else{
					res.render('./theme/event',{
						message: "No Data Exists on Selection Criteria."
					});
				}
				
			})
		}catch(error){
			console.log(error);
		}
    }else if(req.query.search_by){
        match.search_by = req.query.search_by === 'true';
        //console.log(req.query.tag);
        try{

			db.query("SELECT e.name as event_name,et.name as tag_name,e.location as location, e.id as id,e.date as event_date,e.img as img FROM event e INNER JOIN event_tag et on e.tag = et.id WHERE e.name = ?",[req.query.search_by], (error,results) => {
				
				if(results != 0){
					var result = JSON.parse(JSON.stringify(results));
					//res.send(result);
					//res.redirect('/theme/event/', result);
					res.render('./theme/event',{
						result: result
					});
				}else{
					res.render('./theme/event',{
						message: "No Data Exists on Selection Criteria."
					});
				}
				
			})
		}catch(error){
			console.log(error);
		}
    }else if(req.query.sort_by){
    	if(req.query.sort_by === 'name'){
    		
    		try{

				db.query("SELECT e.name as event_name,et.name as tag_name,e.location as location, e.id as id,e.date as event_date,e.img as img FROM event e INNER JOIN event_tag et on e.tag = et.id ORDER BY e.`name` ASC", (error,results) => {
					
					if(error){
						console.log(error);
					}
					if(results != 0){
						var result = JSON.parse(JSON.stringify(results));
						//res.send(result);
						//res.redirect('/theme/event/', result);
						res.render('./theme/event',{
							result: result
						});
					}else{
						res.render('./theme/event',{
							message: "No Data Exists on Selection Criteria."
						});
					}
					
				})
			}catch(error){
				console.log(error);
			}

    	}else{
    		
    		try{

				db.query("SELECT e.name as event_name,et.name as tag_name,e.location as location, e.id as id,e.date as event_date,e.img as img FROM event e INNER JOIN event_tag et on e.tag = et.id ORDER BY e.`date` ASC", (error,results) => {
					
					if(results != 0){
						var result = JSON.parse(JSON.stringify(results));
						//res.send(result);
						//res.redirect('/theme/event/', result);
						res.render('./theme/event',{
							result: result
						});
					}else{
						res.render('./theme/event',{
							message: "No Data Exists on Selection Criteria."
						});
					}
					
				})
			}catch(error){
				console.log(error);
			}

    	}
        
    }else{
		try{

			let currentPage = parseInt(req.query.page) || 1;
			//console.log(currentPage);
			let paginator = {};
			paginator.limit = 9;

			db.query("SELECT count(id) as total FROM event", (error,results) => {
				//console.log(results[0].total);
				res.locals.currentPage = currentPage;
				res.locals.totalPages = Math.ceil(parseInt(results[0].total) / paginator.limit);
				res.locals.totalRows  = parseInt(results[0].total);

				// Make the same variable accessible in the pagination object.
				paginator.totalPages  = res.locals.totalPages;
				paginator.currentPage = currentPage;

				if (res.locals.currentPage > res.locals.totalPages)
        			return res.redirect('/event');

				let limit = paginator.limit;
	    		let offset = res.locals.totalRows - (paginator.limit * res.locals.currentPage);
	    		if (offset < 0) {
			        limit += offset; // Algebraic double negative
			        offset = 0;
			    }
	    		/*console.log(res.locals.totalRows);
	    		console.log(offset);*/
				db.query("SELECT e.name as event_name,et.name as tag_name,e.location as location, e.id as id,e.date as event_date,e.img as img FROM event e INNER JOIN event_tag et on e.tag = et.id LIMIT ? OFFSET ?", [limit,offset], (error,results) => {
	    			/*console.log("total rows: "+res.locals.totalRows);
	    			console.log("total pages: "+paginator.totalPages);
	    			console.log("currnt page: "+paginator.currentPage);*/
					if(error){
						console.log(error);
					}
					if(results){
						var result = JSON.parse(JSON.stringify(results));
						//res.send(result);
						//console.log(req.query.page);
						res.render('./theme/event',{
							result: result,
							paginator: { page: res.locals.currentPage, limit: limit, totalRows: res.locals.totalRows }
						});
					}
					
				})
			});
		}catch(error){
			console.log(error);
		}
	}
}
