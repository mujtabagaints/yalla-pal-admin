const express = require("express");
const app = express();
const router = express.Router();
const authController = require("../controllers/auth");
const property = require("../controllers/property");
const job = require("../controllers/job");

const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
app.use(cookieParser('secret'));
//app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

//routes for login and logout
router.get("/", (req,res) => {
	//res.send("Landing page");
	res.render("login");
});
router.post("/login", authController.login);
router.get("/logout", (req,res) => {
	res.redirect("/");
});
//routes for login and logout section ends
//
//routes for main landing page for admin's
router.get("/dashboard", (req,res) => {
	res.render("dashboard");
});
//routes for adding website main modules ... creation updation list
//*
//property routes*/
router.get("/addProperty", property.add);
router.get("/allProperty", property.get);
/*
	property routes ends
 */
/*
	jobs routes start
 */
router.get("/addJob", job.add);
/*
	jobs routes ends
 */

module.exports = router;
