module.exports = function(sequelize, DataTypes) {
	var Pokemon = sequelize.define("Pokemon", {
		number: DataTypes.INTEGER,
		name: DataTypes.STRING,
		img_front : DataTypes.STRING,
		img_back: DataTypes.STRING
	});
	return Pokemon;
};