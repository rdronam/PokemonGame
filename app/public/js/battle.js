$(document).ready(function() {
	$("#walkInGrass").on("click", generateBattle);
	function generateBattle(event) {
		event.preventDefault();
		$.get("/battle/1");
	};
});