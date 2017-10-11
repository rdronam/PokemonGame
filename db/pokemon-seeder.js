/*jslint node: true */
// pokemon-seeder.js
//
// Code to pull from pokeapi.co an place into database.
//------------------------------------------------------------------------------
// 
// 	After connecting, runs extractPokemon with argument for calling the number
// 	for each pokemon (1-151)
// 	Runs to seed the database.
//
//------------------------------------------------------------------------------

// requires
var mysql = require("mysql");
var request = require("request");

// establish mysql database connection
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "DON'T_RUN",
	database: "pokemon"
});

// Connect to the database
connection.connect(function (err) {
	if (err) {
		throw err;
	}
	// if connected correctly
	console.log("Welcome to Kanto \n You are connected as id " + connection.threadId + "\n");

	for (var i = 1; i <= 151; i++) {
		extractPokemon(1); // begin	
	}
});

// function to EXTRACT from api and Place it into our DB
//------------------------------------------------------------------
function extractPokemon(pokemonNumber) {
	request("https://pokeapi.co/api/v2/pokemon/" + pokemonNumber, function (error, response, body) {
		//	if the API call completed sucessfully
		if (!error && response.statusCode === 200) {
			// SQL - INSERT INTO statement
			connection.query(
				"INSERT INTO tbl_pokemon SET ?", {
					pokemon_name: JSON.parse(body).name,
					pokemon_number: parseInt(JSON.parse(body).id),
					pokemon_img_front: JSON.parse(body).sprites.front_default,
					pokemon_img_back: JSON.parse(body).sprites.back_default
				},
				function (err, res) {
					// callback
					console.log(res.affectedRows + " pokés inserted!\n");
				}
			);
		}
	});
}
