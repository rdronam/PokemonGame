var db = require("../models");

module.exports = {
	generateBattle: function(trainerInfo) {
		var self = this;
		console.log("Starting battle..");
		self.getTrainerPoke(trainerInfo);
	},
	getTrainerPoke: function(trainerInfo) {
		var self = this;
		db.Pokemon.findOne({
			where: {
				number: trainerInfo.pokemon_number
			}
			}).then(function(dbPokemon) {
			poke_Name = dbPokemon.dataValues.name;
			poke_Level = trainerInfo.level;
			poke_HP_C = trainerInfo.health_points_current,
			poke_HP_M = trainerInfo.health_points_max,
			poke_Atk = trainerInfo.attack,
			poke_Exp = trainerInfo.experience,
			poke_Img_Back = db.Pokemon.dataValues.img_back
			var poke = {
				name: poke_Name,
				level: poke_Level,
				hp_c: poke_HP_C,
				hp_m: poke_HP_M,
				atk: poke_Atk,
				exp: poke_Exp,
				img_back: poke_Img_Back
			}
			var trainerPoke = poke;
			self.getRandomPoke(trainerInfo, trainerPoke);
		});
	},
	getRandomPoke: function(trainerInfo, trainerPoke) {
		var self = this;
		randomNumber = Math.floor((Math.random() * 121) + 1);
		console.log(randomNumber);
		db.Pokemon.findOne({
			where: {
				id: randomNumber
			}
			}).then(function(dbPokemon) {
			poke_Name = dbPokemon.dataValues.name;
			poke_Level = trainerInfo.level;
			poke_HP_C = trainerInfo.health_points_current,
			poke_HP_M = trainerInfo.health_points_max,
			poke_Atk = trainerInfo.attack,
			poke_Exp = 0,
			poke_Img_Front = dbPokemon.dataValues.img_front
			var poke = {
				name: poke_Name,
				level: poke_Level,
				hp_c: poke_HP_C,
				hp_m: poke_HP_M,
				atk: poke_Atk,
				exp: poke_Exp,
				img_front: poke_Img_Front
			}
			var randomPoke = poke;
			self.battle(trainerInfo, trainerPoke, randomPoke);
		});
	},
	battle: function(trainerInfo, trainerPoke, randomPoke) {
		var results = []
		var trainerAttackLog = [];
		var randomPokeAttackLog = [];
		console.log("A battle is happening..");
		console.log(trainerInfo.name + "'s " + trainerPoke.name + " VS. " + randomPoke.name);
		var attack = 0;
		var winner = -1;
		while (winner == -1) {
			attack = randomAttack(trainerPoke.level, 6,12);
			if (randomPoke.hp_c - attack <= 0) {
				winner = 1;
			}
			else {
				trainerPoke.hp_c -= attack;
				trainerAttackLog.push(attack);
				attack = randomAttack(randomPoke.level, 6,12);
				if (trainerPoke.hp_c - attack <=0) {
					winner = 0;
				}
				else {
					randomPoke.hp_c -= attack;
					randomPokeAttackLog.push(attack)
				}
			}
		}
		results.push(trainerAttackLog);
		results.push(randomPokeAttackLog);
		batteLog = {
			Winner: winner,
			Results: results,
			TrainerPokeImgBack: trainerPoke.img_back,
			RandomPokeImgFront: randomPoke.img_front
		}
		console.log(batteLog.Winner);
		console.log("Trainer Attacks " + batteLog.Results[0]);
		console.log("Random Poke Attacks " + batteLog.Results[1]);
		return batteLog;
		function randomAttack(level, low, high) {
			return (Math.floor((Math.random() * (high - low) + low) + (5 * (level - 1))));
		}
	}
}