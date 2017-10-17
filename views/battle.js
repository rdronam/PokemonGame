/*jslint browser: true*/ /*global  $*/
//$.post(currentURL + "/api/", userData, function(data){          
//$("#matchName").text(data.name);
//$('#matchImg').attr("src", data.photo);


$(document).ready(function () {
	$("#walkInGrass").on("click", function (event) {
		event.preventDefault();
		alert($(".num").val());
	});
});

//$.get("/battle/1")
