$(document).ready(function() {
	$("#walkInGrass").on("click", generateBattle);
	function generateBattle(event) {
		event.preventDefault();

		console.log("HIII");
		$.get("/battle/1");

		// $.get("/trainers/1");

	};
});