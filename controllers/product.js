const db = require("../config/db.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var dateformat = require('dateformat');

exports.get = async(req,res) => {
	
	try{

		db.query("SELECT * FROM product", (error,results) => {
			
			if(results){
				var result = JSON.parse(JSON.stringify(results));
				console.log(result);
				res.render('./product/allProduct',{
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
	
	res.render("./product/addProduct",{
				success: req.flash("success"),
				error: req.flash("error"),
			});

}
exports.save = (req,res) => {

	try{
		//getting data from request body
		const {name, price, age, condition, description } = req.body;
		//check if one of them is null or not ... if null throw error
		if( !name || !price || !age || !condition || !description ){
			req.flash("error","Please provide All Job details.");
			res.redirect('/product/add');
		}
		//check if request body has file ... if not throw an error
		if (!req.files){
			req.flash("error","No Image was provided!");
			res.redirect('/product/add');
		}
		//console.log(req.files.img);
		var file = req.files.img;
		var img_name = file.name;

		if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif" ){
                                 
            file.mv('./public/theme/media/product/'+img_name, function(err) {
                             
	            if (err){
	                req.flash("error","Sorry! File wasnot uploaded. Error Occured.");
					res.redirect('/product/add');
				}else{
      					db.query("SELECT * FROM product WHERE `name` = ? && price = ? && age = ? && `condition` = ?", [name,price,age,condition], async(error,results) => {
						console.log(error);
						if( !results ) {
							req.flash("error","Details are already Entered!");
							res.redirect('/product/add');
						}
						else{
							console.log(results);
							const product_data = {
								"name": req.body.name, 
								"price": req.body.price, 
								"age": req.body.age, 
								"condition": req.body.condition, 
								"img" : img_name,
								"category": req.body.category ,
								"description": req.body.description ,
								"location": req.body.location ,
								"created_at" : dateformat(new Date(),"yyyy-mm-dd h:M:s")
							};
							console.log(product_data);

							db.query(
								"INSERT INTO `product` SET ?",
								product_data,
								async(error,results) => {
									if(error){
										console.log(error);
									}else{
										req.flash("success","Data Inserted Successfully!");
										res.redirect('/product/all');
									}
								});
							
						}
					})
      			}
			});
        } else {
            req.flash("error","error");
			res.redirect('/product/add');
        }
		
	}catch(error){
		console.log(error);
	}

}
exports.edit = (req,res) => {
	
	try{
		db.query("SELECT * FROM product WHERE id = ?",[req.params.id], (error,result) => {
			
			if(result){
				res.render('./product/editProduct',{
					result: result[0],
					success: req.flash("success"),
					error: req.flash("error"),
				});
				
			}else{
				req.flash("error","error");
				res.redirect('/product/edit/'+req.params.id);
			}
			
		});
	}catch(error){
		console.log(error);
	}

}
exports.update = (req,res) => {
	
	try{
		
		//console.log(req.body.id);

		//check if request body has file ... if not throw an error
		if (!req.files){
			const product_data_for_update = {
								"name": req.body.name, 
								"price": req.body.price, 
								"age": req.body.age, 
								"condition": req.body.condition, 
								"description": req.body.description ,
								"category": req.body.category ,
								"location": req.body.location ,
								"updated_at" : dateformat(new Date(),"yyyy-mm-dd h:M:s")
							};
			console.log(product_data_for_update);
			db.query("UPDATE `product` SET ? WHERE id = ?",[product_data_for_update,req.body.id], (error,results) => {
			
				if(results){
					req.flash("success","Data Updated Successfully!");
					res.redirect('/product/edit/' + req.body.id);
				}if(error){
					//console.log(error);
					req.flash("error","Error occurs on Data Updates!");
					res.redirect('/product/edit/' + req.body.id);
				}
			});
			
		}else{
			//console.log(req.files.img);
			var file = req.files.img;
			var img_name = file.name;

			if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif" ){
	                                 
	            file.mv('./public/theme/media/product/'+img_name, function(err) {
	                             
		            if (err){
		                req.flash("error","Sorry! File wasnot uploaded. Error Occured.");
						res.redirect('/product/edit/' + req.body.id);
					}else{
						const product_data_for_update = {
														"name": req.body.name, 
														"price": req.body.price, 
														"age": req.body.age, 
														"condition": req.body.condition, 
														"img" : img_name,
														"description": req.body.description ,
														"category": req.body.category ,
														"location": req.body.location ,
														"updated_at" : dateformat(new Date(),"yyyy-mm-dd h:M:s")
													};
						console.log(product_data_for_update);
	      				db.query("UPDATE `product` SET ? WHERE id = ?",[product_data_for_update,req.body.id], async(error,results) => {
				
							if(results){

								req.flash("success","Data Updated Successfully!");
								res.redirect('/product/edit/' + req.body.id);
							}else{

								req.flash("error","Error occurs on Data Updates!");
								res.redirect('/product/edit/' + req.body.id);
							}
						});
	      			}
				});
	        } else {
	            req.flash("error","error");
				res.redirect('/product/edit' + req.body.id);
	        }
	    }
		
	}catch(error){
		console.log(error);
	}

}
exports.show = (req,res) => {

	const match = {}
	//console.log(req.query.tag);
	if(req.query.category){
        
        console.log(req.query.category);
        try{

        	let currentPage = parseInt(req.query.page) || 1;
			//console.log(currentPage);
			let paginator = {};
			paginator.limit = 9;

			db.query("SELECT count(id) as total FROM product WHERE category = ?",[req.query.category], (error,results) => {
				console.log(results[0].total);
				res.locals.currentPage = currentPage;
				res.locals.totalPages = Math.ceil(parseInt(results[0].total) / paginator.limit);
				res.locals.totalRows  = parseInt(results[0].total);

				// Make the same variable accessible in the pagination object.
				paginator.totalPages  = res.locals.totalPages;
				paginator.currentPage = currentPage;

				if (res.locals.currentPage > res.locals.totalPages)
        			return res.redirect('/product#main-content');

				let limit = paginator.limit;
	    		let offset = res.locals.totalRows - (paginator.limit * res.locals.currentPage);
	    		if (offset < 0) {
			        limit += offset; // Algebraic double negative
			        offset = 0;
			    }
	    		/*console.log(res.locals.totalRows);
	    		console.log(offset);*/
				db.query("SELECT * FROM product WHERE category = ? LIMIT ? OFFSET ?", [req.query.category,limit,offset], (error,results) => {
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
						res.render('./theme/product',{
							result: result,
							paginator: { page: res.locals.currentPage, limit: limit, totalRows: res.locals.totalRows }
						});
					}
					
				})
			});
		}catch(error){
			console.log(error);
		}
    }else if(req.query.search_by){
        match.search_by = req.query.search_by === 'true';
        //console.log(req.query.tag);
        try{

			let currentPage = parseInt(req.query.page) || 1;
			//console.log(currentPage);
			let paginator = {};
			paginator.limit = 9;

			db.query("SELECT count(id) as total FROM product WHERE name = ?",[req.query.search_by], (error,results) => {
				//console.log(results[0].total);
				res.locals.currentPage = currentPage;
				res.locals.totalPages = Math.ceil(parseInt(results[0].total) / paginator.limit);
				res.locals.totalRows  = parseInt(results[0].total);

				// Make the same variable accessible in the pagination object.
				paginator.totalPages  = res.locals.totalPages;
				paginator.currentPage = currentPage;

				if (res.locals.currentPage > res.locals.totalPages)
        			return res.redirect('/product#main-content');

				let limit = paginator.limit;
	    		let offset = res.locals.totalRows - (paginator.limit * res.locals.currentPage);
	    		if (offset < 0) {
			        limit += offset; // Algebraic double negative
			        offset = 0;
			    }
	    		/*console.log(res.locals.totalRows);
	    		console.log(offset);*/
				db.query("SELECT * FROM product WHERE name = ? LIMIT ? OFFSET ?", [req.query.search_by,limit,offset], (error,results) => {
	    			// console.log("total rows: "+res.locals.totalRows);
	    			// console.log("total pages: "+paginator.totalPages);
	    			// console.log("currnt page: "+paginator.currentPage);
					if(error){
						console.log(error);
					}
					if(results){
						var result = JSON.parse(JSON.stringify(results));
						//res.send(result);
						//console.log(req.query.page);
						res.render('./theme/product',{
							result: result,
							paginator: { page: res.locals.currentPage, limit: limit, totalRows: res.locals.totalRows }
						});
					}
					
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

				db.query("SELECT count(id) as total FROM product ORDER BY name asc", (error,results) => {
					//console.log(results[0].total);
					res.locals.currentPage = currentPage;
					res.locals.totalPages = Math.ceil(parseInt(results[0].total) / paginator.limit);
					res.locals.totalRows  = parseInt(results[0].total);

					// Make the same variable accessible in the pagination object.
					paginator.totalPages  = res.locals.totalPages;
					paginator.currentPage = currentPage;

					if (res.locals.currentPage > res.locals.totalPages)
	        			return res.redirect('/product#main-content');

					let limit = paginator.limit;
		    		let offset = res.locals.totalRows - (paginator.limit * res.locals.currentPage);
		    		if (offset < 0) {
				        limit += offset; // Algebraic double negative
				        offset = 0;
				    }
		    		/*console.log(res.locals.totalRows);
		    		console.log(offset);*/
					db.query("SELECT * FROM product ORDER BY `name` asc LIMIT ? OFFSET ?", [limit,offset], (error,results) => {
		    			// console.log("total rows: "+res.locals.totalRows);
		    			// console.log("total pages: "+paginator.totalPages);
		    			// console.log("currnt page: "+paginator.currentPage);
						if(error){
							console.log(error);
						}
						if(results){
							var result = JSON.parse(JSON.stringify(results));
							//res.send(result);
							//console.log(req.query.page);
							res.render('./theme/product',{
								result: result,
								paginator: { page: res.locals.currentPage, limit: limit, totalRows: res.locals.totalRows }
							});
						}
						
					})
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

				db.query("SELECT count(id) as total FROM product ORDER BY created_at desc", (error,results) => {
					//console.log(results[0].total);
					res.locals.currentPage = currentPage;
					res.locals.totalPages = Math.ceil(parseInt(results[0].total) / paginator.limit);
					res.locals.totalRows  = parseInt(results[0].total);

					// Make the same variable accessible in the pagination object.
					paginator.totalPages  = res.locals.totalPages;
					paginator.currentPage = currentPage;

					if (res.locals.currentPage > res.locals.totalPages)
	        			return res.redirect('/product#main-content');

					let limit = paginator.limit;
		    		let offset = res.locals.totalRows - (paginator.limit * res.locals.currentPage);
		    		if (offset < 0) {
				        limit += offset; // Algebraic double negative
				        offset = 0;
				    }
		    		/*console.log(res.locals.totalRows);
		    		console.log(offset);*/
					db.query("SELECT * FROM product ORDER BY `created_at` desc LIMIT ? OFFSET ?", [limit,offset], (error,results) => {
		    			console.log(results);
						if(error){
							console.log(error);
						}
						if(results){
							var result = JSON.parse(JSON.stringify(results));
							//res.send(result);
							//console.log(req.query.page);
							res.render('./theme/product',{
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
        
    }else{
		try{

			let currentPage = parseInt(req.query.page) || 1;
			//console.log(currentPage);
			let paginator = {};
			paginator.limit = 9;

			db.query("SELECT count(id) as total FROM product", (error,results) => {
				//console.log(results[0].total);
				res.locals.currentPage = currentPage;
				res.locals.totalPages = Math.ceil(parseInt(results[0].total) / paginator.limit);
				res.locals.totalRows  = parseInt(results[0].total);

				// Make the same variable accessible in the pagination object.
				paginator.totalPages  = res.locals.totalPages;
				paginator.currentPage = currentPage;

				if (res.locals.currentPage > res.locals.totalPages)
        			return res.redirect('/product');

				let limit = paginator.limit;
	    		let offset = res.locals.totalRows - (paginator.limit * res.locals.currentPage);
	    		if (offset < 0) {
			        limit += offset; // Algebraic double negative
			        offset = 0;
			    }
	    		/*console.log(res.locals.totalRows);
	    		console.log(offset);*/
				db.query("SELECT * FROM product LIMIT ? OFFSET ?", [limit,offset], (error,results) => {
	    			// console.log("total rows: "+res.locals.totalRows);
	    			// console.log("total pages: "+paginator.totalPages);
	    			// console.log("currnt page: "+paginator.currentPage);
					if(error){
						console.log(error);
					}
					if(results){
						var result = JSON.parse(JSON.stringify(results));
						//res.send(result);
						//console.log(req.query.page);
						res.render('./theme/product',{
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
