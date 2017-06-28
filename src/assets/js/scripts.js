function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
$(document).ready(function () {

	var $box = $('.upload-form .container-fluid'),
	$input = $('.input-button'),
	$window = $(window);

	// Trigger select file window if window clicked
	$('.upload-form').children().not('.input-button').on('click', function () {
		$input.trigger('click');
	});

	// Handle file selected with input
	$input.change(function(){
		alert('Image uploading not completed yet');
	})

	// Drag and drop event handlers
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
			alert('Image uploading not completed yet');
			// $box.addClass('drop-initial drop')
			// setTimeout(function () {
			// 	$box.removeClass('drop-initial');
			// }, 100)
		});

	// Prevent drag and drop on rest of page
	$window
		.on("dragover", function (evt) {
			evt.preventDefault();
		})
		.on("drop", function (evt) {
			evt.preventDefault();
		});

});
