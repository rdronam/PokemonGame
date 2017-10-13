var db = require("../models");
var Pokemon = require("../controllers/pokemon.js");

module.exports = function(App) {
	App.get("/battle/:trainerId?", function(req, res) {
		var trainerId = req.params.trainerId;
		if (trainerId) {
			db.Trainer.findOne({
				where: {
					id: trainerId
				}
			}).then(function(dbTrainer) {
				var results = Pokemon.generateBattle(dbTrainer.dataValues);
				res.json(dbTrainer);
			});
		}
	});
}