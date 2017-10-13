module.exports = function(sequelize, DataTypes) {
	var Trainer = sequelize.define("Trainer", {
		name: DataTypes.STRING,
		pokemon_number: DataTypes.INTEGER,
		level: DataTypes.INTEGER,
		health_points_current: DataTypes.INTEGER,
		health_points_max: DataTypes.INTEGER,
		attack: DataTypes.INTEGER,
		experience: DataTypes.INTEGER
	});
	return Trainer;
};