const express = require("express");
const app = express();
const path = require("path");
const hbs = require('hbs');
const exphs = require("express-handlebars");
const hh = require("handlebars-helper");
var paginate = require('express-handlebars-paginate');
const moment = require("moment");
const fileupload = require("express-fileupload");
var fs = require('fs');
const flash = require('connect-flash');
const session = require('express-session');
app.use(session({ cookie: { maxAge: 60000 }, 
                  secret: 'woot',
                  resave: false, 
                  saveUninitialized: false}));
app.use(flash());

//require file for database
const db = require("./config/db.js");
db.connect( (error) => {
	if(error){
		console.log(error);
	}else{
		console.log("Database Connection Established");
	}
});
//setting directory for CSS & JS Files for views
const publicDirectory = path.join(__dirname,'/public');
app.use(express.static(publicDirectory));

//parsing url encoded bodies
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(fileupload());

//setting view engine for html pages
hbs.registerPartials(__dirname + '/views/partials');
//custom helper functions
hbs.registerHelper('isSelected', function (matchString, matchWith) {
    return matchString === matchWith ? 'selected' : '';
});
hbs.registerHelper("formatDate", function(datetime) {
 	if (moment) {
    	return moment(datetime).format('D MMM YYYY');
  	}else {
    	return datetime;
  	}
});
hbs.handlebars.registerHelper('paginator', paginate.createPagination);
// set the view engine to use handlebars
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
//app.set("view engine", "handlebars");

//defining router here
app.use('/', require('./routes/route'));
app.use('/login', require('./routes/route'));

app.listen(1850, () => {
	console.log("Server gets started on 1850 Port");
});
