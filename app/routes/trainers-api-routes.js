/*jslint node: true */
var db = require("../models");
var Trainer = require("../controllers/pokemon.js");

module.exports = function (App) {
	//LOGIN ROUTE
	App.get("/trainers/:trainerName?", function (req, res) {
		var trainerName = req.params.trainerName;
		//if exists
		if (trainerName) {
			// Query for trainer in DB
			db.Trainer.findOne({
				where: {
					name: trainerName
				}
			}).then(function (dbTrainer) {
				//IF TRAINER ALREADY EXISTS
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
						var renderObj = poke;
						res.render("battle.ejs",{{profile:renderObj});
					});
				} else {
					//SQL TO INSERT AND RENDER
					var randomPokemon = Math.floor(Math.random() * 151);
					db.Trainer.create({
						name: req.params.trainerName,
						pokemon_number: randomPokemon,
						level: 1,
						health_points_current: 200,
						health_points_max: 200,
						attack: 50,
						experience: 0
					});
				}
			});
		}

	});
};
