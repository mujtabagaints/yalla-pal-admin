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
	//req.session.destroy();
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
router.get("/test", property.get);
router.get("/addProperty", property.add);
router.post("/saveProperty", property.save);
router.get("/editProperty/:id", property.edit);
router.post("/updateProperty", property.update);
router.get("/allProperty", property.get);
/*
	property routes ends
 */
/*
	industry routes start
 */
router.get("/addJobIndustry", industry.add);
/*
	industry routes ends
 */
/*
	jobs routes start
 */
router.get("/addJob", job.add);
/*
	jobs routes ends
 */
/*
	event routes start
 */
router.get("/addEvent", event.add);
/*
	event routes ends
 */
/*
	car routes start
 */
router.get("/addCar", car.add);
/*
	car routes ends
 */
/*
	product routes start
 */
router.get("/addProduct", product.add);
/*
	product routes ends
 */

module.exports = router;
