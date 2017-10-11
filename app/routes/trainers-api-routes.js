var db = require("../models");

module.exports = function(App) {
	App.get("/trainers/:trainerId?", function(req, res) {
		var trainerId = req.params.trainerId;
		console.log(trainerId);
		if (trainerId) {
			db.Trainer.findOne({
				where: {
					id: trainerId
				}
			}).then(function(dbTrainer) {
				console.log(dbTrainer.dataValues.name);
				console.log(dbTrainer.dataValues.level);
				res.json(dbTrainer);
			});
		}
		else {
			db.Trainer.findAll({}).then(function(dbTrainer) {
				res.json(dbTrainer);
			});
		}
	});
}