var Path = require("path");
module.exports = function(App) {
	App.get("/", function(req, res) {
		res.sendFile(Path.join(__dirname, "../public/index.html"));
	});
	App.get("/battle", function(req, res) {
		res.render(Path.join(__dirname, "../views/battle.ejs"));
	});
	
	
}