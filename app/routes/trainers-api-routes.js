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
				if(dbTrainer !== null){
					res.json(dbTrainer);
				//RENDER BATTLE PAGE
				//res.render("battle.ejs",{battleInfo:results});
			}else{
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
