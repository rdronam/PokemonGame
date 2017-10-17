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
					db.Trainer.findOne({
						where: {
							id: trainerId
						}
					}).then(function (dbTrainer) {
						if (dbTrainer !== null) {
							//res.json(dbTrainer); // Placeholder for Postman
							var trainerInfo = dbTrainer.dataValues;
							//RENDER BATTLE PAGE
							db.Pokemon.findOne({
								where: {
									number: trainerInfo.pokemon_number
								}
							}).then(function (dbPokemon) {
								var train_Name = trainerInfo.name;
								var poke_Name = dbPokemon.dataValues.name;
								var poke_Level = trainerInfo.level;
								var poke_HP_C = trainerInfo.health_points_current;
								var poke_Atk = trainerInfo.attack;
								var poke_Exp = trainerInfo.experience;
								var poke = {
									name: train_Name,
									pokemon: poke_Name,
									level: poke_Level,
									hp_c: poke_HP_C,
									atk: poke_Atk,
									exp: poke_Exp
								};
								var profileObj = poke;
//								res.json({profile:profileObj, battleInfo:results});
								res.render("battle2.ejs",{profile:profileObj, battleInfo:results});
							});
						}
					});
					
					
				});
			});
		}
	});
};
