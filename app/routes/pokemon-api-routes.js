/*jslint node: true */
var db = require("../models");
var Pokemon = require("../controllers/pokemon.js");

module.exports = function (App) {
	App.get("/battle/:trainerId?", function (req, res) {
		var trainerId = req.params.trainerId;
		if (trainerId) {
			db.Trainer.findOne({
				where: {
					id: trainerId
				}
			}).then(function (dbTrainer) {
				Pokemon.generateBattle(dbTrainer.dataValues, function (results) {
					console.log("Results from generateBattle():", results);
					//res.json(results);
					res.render("battle2.ejs",{battleInfo:results});
				});
			});
		}
	});
};
