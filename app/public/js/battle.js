$(document).ready(function() {
	$("#walkInGrass").on("click", generateBattle);
	function generateBattle(event) {
		event.preventDefault();
<<<<<<< HEAD
		console.log("HIII");
		$.get("/battle/1");
=======
		$.get("/trainers/1");
>>>>>>> fb8d1123f871bbc850697c304bc84a7e887f9b97
	};
});