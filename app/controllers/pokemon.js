/*jslint node: true */
var db = require("../models");

module.exports = {
	generateBattle: function (trainerInfo, cb) {
		var self = this;
		console.log("Starting battle..");
		self.getTrainerPoke(trainerInfo, cb);
	},
	getTrainerPoke: function (trainerInfo, cb) {
		var self = this;
		db.Pokemon.findOne({
			where: {
				number: trainerInfo.pokemon_number
			}
		}).then(function (dbPokemon) {
			var poke_Name = dbPokemon.dataValues.name;
			var poke_Level = trainerInfo.level;
			var poke_HP_C = trainerInfo.health_points_current;
			var poke_HP_M = trainerInfo.health_points_max;
			var poke_Atk = trainerInfo.attack;
			var poke_Exp = trainerInfo.experience;
			var poke_Img_Front = dbPokemon.dataValues.img_front;
			var poke = {
				name: poke_Name,
				level: poke_Level,
				hp_c: poke_HP_C,
				hp_m: poke_HP_M,
				atk: poke_Atk,
				exp: poke_Exp,
				img_front: poke_Img_Front
			};
			var trainerPoke = poke;
			self.getRandomPoke(trainerInfo, trainerPoke, cb);
		});
	},
	getRandomPoke: function (trainerInfo, trainerPoke, cb) {
		var self = this;
		var randomNumber = Math.floor((Math.random() * 151) + 1);
		console.log(randomNumber);
		db.Pokemon.findOne({
			where: {
				id: randomNumber
			}
		}).then(function (dbPokemon) {
			var poke_Name = dbPokemon.dataValues.name;
			var poke_Level = trainerInfo.level;
			var poke_HP_C = trainerInfo.health_points_current;
			var poke_HP_M = trainerInfo.health_points_max;
			var poke_Atk = trainerInfo.attack;
			var poke_Exp = 0;
			var poke_Img_Front = dbPokemon.dataValues.img_front;
			var poke = {
				name: poke_Name,
				level: poke_Level,
				hp_c: poke_HP_C,
				hp_m: poke_HP_M,
				atk: poke_Atk,
				exp: poke_Exp,
				img_front: poke_Img_Front
			};
			var randomPoke = poke;
			self.battle(trainerInfo, trainerPoke, randomPoke, cb);
		});
	},
	battle: function (trainerInfo, trainerPoke, randomPoke, cb) {
		var self = this;
		var results = [];
		var trainerAttackLog = [];
		var randomPokeAttackLog = [];
		var expArray = [100, 200, 350, 500, 650, 1150, 1600, 1950, 2600, 3050, 4000, 5000, 6000, 6650, 7650, 8850, 10100, 11350, 12650, 14000, 15800, 17650, 19550, 21500, 23450, 27000, 30650, 34400, 38250, 39850, 43100, 46450, 49850, 53350, 56850, 61150, 65500, 70000, 74550, 79200, 83150, 87200, 91300, 95450, 99650, 106800, 114050, 121450, 129000, 210650];
		console.log("A battle is happening..");
		console.log(trainerInfo.name + "'s " + trainerPoke.name + " VS. " + randomPoke.name);
		var attack = 0;
		var winner = -1;
		var trainerTotalAttack = 0;
		var randomTotalAttack = 0;
		while (winner == -1) {
			attack = self.randomAttack(trainerPoke.level, 6, 12);
			if (randomPoke.hp_c - attack <= 0) {
				randomPoke.hp_c = 0;
				trainerTotalAttack += attack;
				trainerAttackLog.push(attack);
				winner = 1;
			} else {
				randomPoke.hp_c -= attack;
				trainerTotalAttack += attack;
				trainerAttackLog.push(attack);
				attack = self.randomAttack(randomPoke.level, 6, 12);
				if (trainerPoke.hp_c - attack <= 0) {
					trainerPoke.hp_c = 0;
					randomTotalAttack += attack;
					randomPokeAttackLog.push(attack);
					winner = 0;
				} else {
					trainerPoke.hp_c -= attack;
					randomTotalAttack += attack;
					randomPokeAttackLog.push(attack);
				}
			}
		}
		results.push(trainerAttackLog);
		results.push(randomPokeAttackLog);
		var battleLog = {
			Winner: winner,
			Results: results,
			TrainerPokeHpCurrent: trainerPoke.hp_c,
			TrainerPokeImgFront: trainerPoke.img_front,
			TrainerTotalAttack: trainerTotalAttack,
			RandomPokeHpCurrent: randomPoke.hp_c,
			RandomPokeImgFront: randomPoke.img_front,
			RandomTotalAttack: randomTotalAttack
		};
		if (winner == 1) {
			console.log("Congratz! You won!");
			trainerInfo.experience += 50;
			console.log(trainerInfo, expArray[trainerInfo.level - 1]);
			if (trainerInfo.experience >= expArray[trainerInfo.level - 1] && trainerInfo.level != 50) {
				//Level Up
				trainerInfo.health_points_max += 2;
				trainerInfo.level++;
				console.log("Level Up\n", trainerInfo);
				db.Trainer.update({
					level: trainerInfo.level,
					experience: trainerInfo.experience,
					health_points_max: trainerInfo.health_points_max,
					health_points_current: trainerInfo.health_points_max
				}, {
					where: {
						id: trainerInfo.id
					}
				}).then(function (dbTrainer) {
					console.log("Handlebars Render", dbTrainer);
					console.log("Trainer Attacks: " + battleLog.Results[0]);
					console.log("Random Poke Attacks: " + battleLog.Results[1]);
					return cb(battleLog);
				});
			} else {
				console.log("Already Level 50 OR You didn't Level Up");
				db.Trainer.update({
					experience: trainerInfo.experience
				}, {
					where: {
						id: trainerInfo.id
					}
				}).then(function (dbTrainer) {
					console.log("Handlebars Render", dbTrainer);
					console.log("Trainer Attacks: " + battleLog.Results[0]);
					console.log("Random Poke Attacks: " + battleLog.Results[1]);
					return cb(battleLog);
				});
			}
		} else {
			console.log("Too bad, you lost!");
			console.log("Trainer Attacks: " + battleLog.Results[0]);
			console.log("Random Poke Attacks: " + battleLog.Results[1]);
			return cb(battleLog);
		}

	},
	randomAttack: function (level, low, high) {
		return (Math.floor((Math.random() * (high - low) + low) + (5 * (level - 1))));
	}
};
