var db = require("../models");
var Trainer = require("../controllers/pokemon.js");

module.exports = function(App) {
	App.get("/trainers/:trainerName?", function(req, res) {
		var trainerName = req.params.trainerName;
		if (trainerName) {
			db.Trainer.findOne({
				where: {
					name: trainerName
				}
			}).then(function(dbTrainer) {
				res.json(dbTrainer);
				//RENDER BATTLE PAGE
			});
		}
	});
}