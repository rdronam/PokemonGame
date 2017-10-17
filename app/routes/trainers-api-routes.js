/*jslint node: true */
var db = require("../models");
var Trainer = require("../controllers/pokemon.js");

module.exports = function (App) {
	//LOGIN ROUTE
	App.get("/trainers/:trainerName?", function (req, res) {
		var trainerName = req.query.trainerName;
		console.log(trainerName);
		//if exists
		if (trainerName) {
			// Query for trainer in DB
			db.Trainer.findOne({
				where: {
					name: trainerName
				}
			}).then(function (dbTrainer) {
				//IF TRAINER ALREADY EXISTS
				// console.log(dbTrainer);
				if (dbTrainer !== null) {
					//res.json(dbTrainer); // Placeholder for Postman
					var trainerInfo = dbTrainer.dataValues;
					//RENDER BATTLE PAGE
					db.Pokemon.findOne({
						where: {
							number: trainerInfo.pokemon_number
						}
					}).then(function (dbPokemon) {
						var train_Num = trainerInfo.id;
						var train_Name = trainerInfo.name;
						var poke_Name = dbPokemon.dataValues.name;
						var poke_Level = trainerInfo.level;
						var poke_HP_C = trainerInfo.health_points_current;
						var poke_Atk = trainerInfo.attack;
						var poke_Exp = trainerInfo.experience;
						var poke = {
							num:train_Num,
							name: train_Name,
							pokemon: poke_Name,
							level: poke_Level,
							hp_c: poke_HP_C,
							atk: poke_Atk,
							exp: poke_Exp
						};
						var renderObj = poke;
//						console.log({profile: renderObj});
						res.render("battle.ejs", {profile: renderObj} );
					});
				} else {
			// NEW TRAINER APPEARS!
					//SQL TO INSERT AND RENDER
					var randomPokemon = Math.ceil(Math.random() * 25);
					db.Trainer.create({
						name: req.query.trainerName,
						pokemon_number: randomPokemon,
						level: 1,
						health_points_current: 200,
						health_points_max: 200,
						attack: 50,
						experience: 0
					}).then(function (dbTrainer) {
						var trainerInfo = dbTrainer.dataValues;
						db.Pokemon.findOne({
							where: {
								number: randomPokemon
							}
						}).then(function (dbPokemon) {
							var train_Num = trainerInfo.id;
							var train_Name = trainerInfo.name;
							var poke_Name = dbPokemon.dataValues.name;
							var poke_Level = trainerInfo.level;
							var poke_HP_C = trainerInfo.health_points_current;
							var poke_Atk = trainerInfo.attack;
							var poke_Exp = trainerInfo.experience;
							var poke = {
								num:train_Num,
								name: train_Name,
								pokemon: poke_Name,
								level: poke_Level,
								hp_c: poke_HP_C,
								atk: poke_Atk,
								exp: poke_Exp
							};
							var renderObj = poke;
							res.render("battle.ejs", {
								profile: renderObj
							});
						});
					});
				}
			});
		}

	});
};
