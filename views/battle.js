$.post(currentURL + "/api/", userData, function(data){          
$("#matchName").text(data.name);
$('#matchImg').attr("src", data.photo);


$(document).ready(function() {
	$("#walkInGrass").on("click", generateBattle);
	function generateBattle(event) {
		event.preventDefault();

		console.log("HIII");
		$.get("/battle/1")

  