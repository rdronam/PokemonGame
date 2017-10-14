/*jslint node: true */
var db = require("../models");
var Pokemon = require("../controllers/pokemon.js");

module.exports = function (App) {
	App.get("/battle/:trainerId?", function (req, res) {
		console.log("HI");
		var trainerId = req.params.trainerId;
		if (trainerId) {
			db.Trainer.findOne({
				where: {
					id: trainerId
				}
			}).then(function (dbTrainer) {
				Pokemon.generateBattle(dbTrainer.dataValues, function (results) {
					console.log("Results from generateBattle():", results);
					res.json(results);

				});
				
				//res.render(results);
			});
		}
	});
};
