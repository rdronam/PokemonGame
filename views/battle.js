$(document).ready(function() {
	$("#walkInGrass").on("click", generateBattle);
	function generateBattle(event) {
		event.preventDefault();

		console.log("HIII");
		$.get("/battle/1");

    	console.log(data);
    	renderTrainer(data);

  };

});

function renderTrainer(data) {
  if (data.length !== 0) {

    $("#stats").empty();
    $("#stats").show();

    for (var i = 0; i < data.length; i++) {

      var div = $("<div>");

      div.append("<p>TrainerName" + data[i].train_Name + "</p>");
      div.append("<p>PokemonName: " + data[i].poke_Name + "</p>");
      div.append("<p>PokemonLevel: " + data[i].poke_Level + "</p>");
      div.append("<p>PokemonHP: " + data[i].poke_HP_C + "</p>");
      div.append("<p>PokemonEXP: " + data[i].poke_EXP + "</p>");

      $("#stats").append(div);

    }

	};
};