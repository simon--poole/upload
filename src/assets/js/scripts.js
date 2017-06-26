$(document).ready(function () {

	$('.upload-form').children().not('.input-button').on('click', function () {
		$('.input-button').trigger('click');
	});

	$box = $('.upload-form .container-fluid')

	$box
		.on('dragenter', function (evt) {
			evt.preventDefault();
			$box.addClass('hover hover-initial');
			setTimeout(function () {
				$box.removeClass('hover-initial');
			}, 100)
		})
		.on('dragleave drop', function (evt) {
			evt.preventDefault();
			$box.removeClass('hover');
		})
		.on('drop', function (evt) {
			evt.preventDefault();
			$box.removeClass('hover');
			$box.addClass('drop-initial drop')
			setTimeout(function () {
				$box.removeClass('drop-initial');
			}, 100)
		});
	var $window = $(window);
	$window
		.on("dragover", function (evt) {
			evt.preventDefault();
		})
		.on("drop", function (evt) {
			evt.preventDefault();
		});
});
