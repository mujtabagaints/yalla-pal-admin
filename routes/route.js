const express = require("express");
const app = express();
const router = express.Router();
const authController = require("../controllers/auth");
const property = require("../controllers/property");
const job = require("../controllers/job");
const event = require("../controllers/event");
const car = require("../controllers/car");
const industry = require("../controllers/industry");
const product = require("../controllers/product");

const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
app.use(cookieParser('secret'));
//app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

//functon for checking if the user is log in or not
//if user is log in than this function will allow to view page otherwise login page will show with error
function requireLogin(req, res, next) {
	next();
  	if (req.session.loggedin) {
    	next(); // allow the next route to run
  	} else {
    	// require the user to log in
    	req.flash("error","Please Loggedin to Continue!");
    	res.redirect("/"); // or render a form, etc.
  	}
}

//routes for login and logout
router.get("/", (req,res) => {
	//res.send("Landing page");
	res.render("login",{
		error: req.flash("error")
	});
});
router.post("/login", authController.login);
router.get("/logout", (req,res) => {
	req.flash("error","You are logged out!");
	req.session.destroy();
	res.redirect("/");
});
//routes for login and logout section ends

//routes for main landing page for admin's
router.get("/dashboard", (req,res) => {
	if (req.session.loggedin) {
		res.render("dashboard",{
			userloggedin : req.session.username,
			success: "Welcome " + req.session.username
		});
	}else{
		req.flash("error","Please Loggedin to Continue!");
		res.redirect('/');
	}
});
//routes for adding website main modules ... creation updation list
//*
//property routes*/
router.get("/property/all", property.get);
router.get("/property/add", property.add);
router.post("/property/save", property.save);
router.get("/property/edit/:id", property.edit);
router.post("/property/update", property.update);
/*
	property routes ends
 */
/*
	industry routes start
 */
router.get("/job/industry/add", industry.add);
router.post("/job/industry/save", industry.save);
router.get("/job/industry/edit/:id", industry.edit);
router.post("/job/industry/update", industry.update);
router.get("/job/industry/all", industry.get);
/*
	industry routes ends
 */
/*
	jobs routes start
 */
router.get("/job/add",  job.add);
router.post("/job/save", job.save);
router.get("/job/all",  job.get);
router.get("/job/edit/:id",  job.edit);
router.post("/job/update", job.update);
/*
	jobs routes ends
 */
/*
	event routes start
 */
router.get("/event/add", event.add);
router.post("/event/save", event.save);
router.get("/event/all", event.get);
router.get("/event/edit/:id", event.edit);
router.post("/event/update", event.update);
/*
	event routes ends
 */
/*
	car routes start
 */
router.get("/car/add", car.add);
router.post("/car/save", car.save);
router.get("/car/all", car.get);
router.get("/car/edit/:id", car.edit);
router.post("/car/update", car.update);
/*
	car routes ends
 */
/*
	product routes start
 */
router.get("/product/add", product.add);
router.post("/product/save", product.save);
router.get("/product/all", product.get);
router.get("/product/edit/:id", product.edit);
router.post("/product/update", product.update);
/*
	product routes ends
 */
router.get("/event", event.show);
router.get("/product", product.show);
router.get("/car", (req,res) => {
	res.render("./theme/car");
});
router.get("/job", job.show);
router.get("/property", property.show);
module.exports = router;
