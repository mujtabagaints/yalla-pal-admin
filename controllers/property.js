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
								"type": req.body.type ,
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
										"type": req.body.type ,
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
										"type": req.body.type ,
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
exports.show = (req,res) => {

	const match = {}
	//console.log(req.query.tag);
	if(req.query.type){
        
        console.log(req.query.type);
        try{

        	let currentPage = parseInt(req.query.page) || 1;
			//console.log(currentPage);
			let paginator = {};
			paginator.limit = 9;

			db.query("SELECT count(id) as total FROM property WHERE type = ?",[req.query.type], (error,results) => {
				//console.log(results[0].total);
				res.locals.currentPage = currentPage;
				res.locals.totalPages = Math.ceil(parseInt(results[0].total) / paginator.limit);
				res.locals.totalRows  = parseInt(results[0].total);

				// Make the same variable accessible in the pagination object.
				paginator.totalPages  = res.locals.totalPages;
				paginator.currentPage = currentPage;

				if (res.locals.currentPage > res.locals.totalPages)
        			return res.redirect('/property#main-content');

				let limit = paginator.limit;
	    		let offset = res.locals.totalRows - (paginator.limit * res.locals.currentPage);
	    		if (offset < 0) {
			        limit += offset; // Algebraic double negative
			        offset = 0;
			    }
	    		/*console.log(res.locals.totalRows);
	    		console.log(offset);*/
				db.query("SELECT * FROM property WHERE type = ? LIMIT ? OFFSET ?", [req.query.type,limit,offset], (error,results) => {
	    			
					if(error){
						console.log(error);
					}
					if(results){
						var result = JSON.parse(JSON.stringify(results));
						//res.send(result);
						//console.log(req.query.page);
						res.render('./theme/property',{
							result: result,
							paginator: { page: res.locals.currentPage, limit: limit, totalRows: res.locals.totalRows }
						});
					}
					
				});
			});
		}catch(error){
			console.log(error);
		}
    }else if(req.query.search_by){
        //match.search_by = req.query.search_by === 'true';
        console.log(req.query.search_by);
        try{

			let currentPage = parseInt(req.query.page) || 1;
			//console.log(currentPage);
			let paginator = {};
			paginator.limit = 9;

			db.query("SELECT count(id) as total FROM property WHERE name = ?",[req.query.search_by], (error,results) => {
				//console.log(results[0].total);
				res.locals.currentPage = currentPage;
				res.locals.totalPages = Math.ceil(parseInt(results[0].total) / paginator.limit);
				res.locals.totalRows  = parseInt(results[0].total);

				// Make the same variable accessible in the pagination object.
				paginator.totalPages  = res.locals.totalPages;
				paginator.currentPage = currentPage;

				if (res.locals.currentPage > res.locals.totalPages)
        			return res.redirect('/property#main-content');

				let limit = paginator.limit;
	    		let offset = res.locals.totalRows - (paginator.limit * res.locals.currentPage);
	    		if (offset < 0) {
			        limit += offset; // Algebraic double negative
			        offset = 0;
			    }
	    		/*console.log(res.locals.totalRows);
	    		console.log(offset);*/
				db.query("SELECT * FROM property WHERE name = ? LIMIT ? OFFSET ?", [req.query.search_by,limit,offset], (error,results) => {
	    			
					if(error){
						console.log(error);
					}
					if(results){
						var result = JSON.parse(JSON.stringify(results));
						//res.send(result);
						//console.log(req.query.page);
						res.render('./theme/property',{
							result: result,
							paginator: { page: res.locals.currentPage, limit: limit, totalRows: res.locals.totalRows }
						});
					}
				})
			});
		}catch(error){
			console.log(error);
		}
    }else if(req.query.level){
        //match.level = req.query.level === 'true';
        //console.log(req.query.level);
        try{

			let currentPage = parseInt(req.query.page) || 1;
			//console.log(currentPage);
			let paginator = {};
			paginator.limit = 9;

			db.query("SELECT count(id) as total FROM job WHERE career_level = ?",[req.query.level], (error,results) => {
				//console.log(results[0].total);
				res.locals.currentPage = currentPage;
				res.locals.totalPages = Math.ceil(parseInt(results[0].total) / paginator.limit);
				res.locals.totalRows  = parseInt(results[0].total);

				// Make the same variable accessible in the pagination object.
				paginator.totalPages  = res.locals.totalPages;
				paginator.currentPage = currentPage;

				if (res.locals.currentPage > res.locals.totalPages)
        			return res.redirect('/job#main-content');

				let limit = paginator.limit;
	    		let offset = res.locals.totalRows - (paginator.limit * res.locals.currentPage);
	    		if (offset < 0) {
			        limit += offset; // Algebraic double negative
			        offset = 0;
			    }
	    		/*console.log(res.locals.totalRows);
	    		console.log(offset);*/
				db.query("SELECT * FROM job WHERE career_level = ? LIMIT ? OFFSET ?", [req.query.level,limit,offset], (error,results) => {
	    			db.query("SELECT * FROM job_industry", [limit,offset], (error,category) => {
						if(error){
							console.log(error);
						}
						if(results){
							var result = JSON.parse(JSON.stringify(results));
							//res.send(result);
							//console.log(req.query.page);
							res.render('./theme/job',{
								result: result,
								category: category,
								paginator: { page: res.locals.currentPage, limit: limit, totalRows: res.locals.totalRows }
							});
						}
					});
				})
			});
		}catch(error){
			console.log(error);
		}
    }else if(req.query.experience){
        //match.experience = req.query.experience === 'true';
        console.log(req.query.experience);
        try{

			let currentPage = parseInt(req.query.page) || 1;
			//console.log(currentPage);
			let paginator = {};
			paginator.limit = 9;

			db.query("SELECT count(id) as total FROM job WHERE experience = ?",[req.query.experience], (error,results) => {
				//console.log(results[0].total);
				res.locals.currentPage = currentPage;
				res.locals.totalPages = Math.ceil(parseInt(results[0].total) / paginator.limit);
				res.locals.totalRows  = parseInt(results[0].total);

				// Make the same variable accessible in the pagination object.
				paginator.totalPages  = res.locals.totalPages;
				paginator.currentPage = currentPage;

				if (res.locals.currentPage > res.locals.totalPages)
        			return res.redirect('/job#main-content');

				let limit = paginator.limit;
	    		let offset = res.locals.totalRows - (paginator.limit * res.locals.currentPage);
	    		if (offset < 0) {
			        limit += offset; // Algebraic double negative
			        offset = 0;
			    }
	    		/*console.log(res.locals.totalRows);
	    		console.log(offset);*/
				db.query("SELECT * FROM job WHERE experience = ? LIMIT ? OFFSET ?", [req.query.experience,limit,offset], (error,results) => {
	    			db.query("SELECT * FROM job_industry", [limit,offset], (error,category) => {
						if(error){
							console.log(error);
						}
						if(results){
							var result = JSON.parse(JSON.stringify(results));
							//res.send(result);
							//console.log(req.query.page);
							res.render('./theme/job',{
								result: result,
								category: category,
								paginator: { page: res.locals.currentPage, limit: limit, totalRows: res.locals.totalRows }
							});
						}
					});
				})
			});
		}catch(error){
			console.log(error);
		}
    }else if(req.query.sort_by){
    	if(req.query.sort_by === 'name'){
    		
    		try{

				let currentPage = parseInt(req.query.page) || 1;
				//console.log(currentPage);
				let paginator = {};
				paginator.limit = 9;

				db.query("SELECT count(id) as total FROM property ORDER BY name asc", (error,results) => {
					//console.log(results[0].total);
					res.locals.currentPage = currentPage;
					res.locals.totalPages = Math.ceil(parseInt(results[0].total) / paginator.limit);
					res.locals.totalRows  = parseInt(results[0].total);

					// Make the same variable accessible in the pagination object.
					paginator.totalPages  = res.locals.totalPages;
					paginator.currentPage = currentPage;

					if (res.locals.currentPage > res.locals.totalPages)
	        			return res.redirect('/property#main-content');

					let limit = paginator.limit;
		    		let offset = res.locals.totalRows - (paginator.limit * res.locals.currentPage);
		    		if (offset < 0) {
				        limit += offset; // Algebraic double negative
				        offset = 0;
				    }
		    		/*console.log(res.locals.totalRows);
		    		console.log(offset);*/
					db.query("SELECT * FROM property ORDER BY `name` asc LIMIT ? OFFSET ?", [limit,offset], (error,results) => {
		    			
						if(error){
							console.log(error);
						}
						if(results){
							var result = JSON.parse(JSON.stringify(results));
							//res.send(result);
							//console.log(req.query.page);
							res.render('./theme/property',{
								result: result,
								paginator: { page: res.locals.currentPage, limit: limit, totalRows: res.locals.totalRows }
							});
						}
						
					});
				});
			}catch(error){
				console.log(error);
			}

    	}else{
    		
    		try{

    			let currentPage = parseInt(req.query.page) || 1;
				//console.log(currentPage);
				let paginator = {};
				paginator.limit = 9;

				db.query("SELECT count(id) as total FROM property ORDER BY created_at desc", (error,results) => {
					//console.log(results[0].total);
					res.locals.currentPage = currentPage;
					res.locals.totalPages = Math.ceil(parseInt(results[0].total) / paginator.limit);
					res.locals.totalRows  = parseInt(results[0].total);

					// Make the same variable accessible in the pagination object.
					paginator.totalPages  = res.locals.totalPages;
					paginator.currentPage = currentPage;

					if (res.locals.currentPage > res.locals.totalPages)
	        			return res.redirect('/property#main-content');

					let limit = paginator.limit;
		    		let offset = res.locals.totalRows - (paginator.limit * res.locals.currentPage);
		    		if (offset < 0) {
				        limit += offset; // Algebraic double negative
				        offset = 0;
				    }
		    		/*console.log(res.locals.totalRows);
		    		console.log(offset);*/
					db.query("SELECT * FROM property ORDER BY `created_at` desc LIMIT ? OFFSET ?", [limit,offset], (error,results) => {
						if(error){
							console.log(error);
						}
						if(results){
							var result = JSON.parse(JSON.stringify(results));
							//res.send(result);
							//console.log(req.query.page);
							res.render('./theme/property',{
								result: result,
								paginator: { page: res.locals.currentPage, limit: limit, totalRows: res.locals.totalRows }
							});
						}
					});
				});
				
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

			db.query("SELECT count(id) as total FROM property", (error,results) => {
				//console.log(results[0].total);
				res.locals.currentPage = currentPage;
				res.locals.totalPages = Math.ceil(parseInt(results[0].total) / paginator.limit);
				res.locals.totalRows  = parseInt(results[0].total);

				// Make the same variable accessible in the pagination object.
				paginator.totalPages  = res.locals.totalPages;
				paginator.currentPage = currentPage;

				if (res.locals.currentPage > res.locals.totalPages)
        			return res.redirect('/property');

				let limit = paginator.limit;
	    		let offset = res.locals.totalRows - (paginator.limit * res.locals.currentPage);
	    		if (offset < 0) {
			        limit += offset; // Algebraic double negative
			        offset = 0;
			    }
	    		/*console.log(res.locals.totalRows);
	    		console.log(offset);*/
				db.query("SELECT * FROM property LIMIT ? OFFSET ?", [limit,offset], (error,results) => {

    				//console.log(category);
					if(error){
						console.log(error);
					}
					if(results){
						var result = JSON.parse(JSON.stringify(results));
						//res.send(result);
						//console.log(req.query.page);
						res.render('./theme/property',{
							result: result,
							paginator: { page: res.locals.currentPage, limit: limit, totalRows: res.locals.totalRows }
						});
					}

				});
			});
		}catch(error){
			console.log(error);
		}
	}
}
