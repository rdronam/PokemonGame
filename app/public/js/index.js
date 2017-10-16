/*jslint browser: true*/ /*global  $*/
$('.form').find('input, textarea').on('keyup blur focus', function (e) {

	var $this = $(this),
		label = $this.prev('label');

	if (e.type === 'keyup') {
		if ($this.val() === '') {
			label.removeClass('active highlight');
		} else {
			label.addClass('active highlight');
		}
	} else if (e.type === 'blur') {
		if ($this.val() === '') {
			label.removeClass('active highlight');
		} else {
			label.removeClass('highlight');
		}
	} else if (e.type === 'focus') {

		if ($this.val() === '') {
			label.removeClass('highlight');
		} else if ($this.val() !== '') {
			label.addClass('highlight');
		}
	}

});

$('.tab a').on('click', function (e) {

	e.preventDefault();

	$(this).parent().addClass('active');
	$(this).parent().siblings().removeClass('active');

	target = $(this).attr('href');

	$('.tab-content > div').not(target).hide();

	$(target).fadeIn(600);

});

$(".form").click(function () {
	$("#target").submit();
});

$(document).ready(function () {

	$("#signupSubmit").on("click", function (event) {
		event.preventDefault();
		var name = $("#signupName").val().trim();
		$.get("/trainers/" + name);
	});

	$("#loginSubmit").on("click", function (event) {
		event.preventDefault();
		var name = $("#loginName").val().trim();
		$.get("/trainers/" + name);
	});
});
