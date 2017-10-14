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
	password: "Firas123",
	database: "pokemon_db"
});

// Connect to the database
connection.connect(function (err) {
	if (err) {
		throw err;
	}
	// if connected correctly
	console.log("Welcome to Kanto \n You are connected as id " + connection.threadId + "\n");

	for (i = 1; i <= 151; i++) {
		extractPokemon(i); // begin	
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
				"INSERT INTO pokemons SET ?", {
					name: JSON.parse(body).name,
					number: parseInt(JSON.parse(body).id),
					img_front: JSON.parse(body).sprites.front_default,
					img_back: JSON.parse(body).sprites.back_default,
					createdAt: "0000:00:00 00:00:00",
					updatedAt: "0000:00:00 00:00:00"
				},
				function (err, res) {
					// callback
					console.log(res.affectedRows + " pokés inserted!\n");
				}
			);
		}
	});
}
