/*jslint node: true */
var Path = require("path");
module.exports = function(App) {
	App.get("/", function(req, res) {
		res.sendFile(Path.join(__dirname, "../public/index.html"));
	});
	App.get("/battle", function(req, res) {
		res.render(Path.join(__dirname, "../views/battle.ejs"));
	});
	App.get("/battle2", function(req, res) {
		res.render(Path.join(__dirname, "../views/battle2.ejs"));
	});
	
};