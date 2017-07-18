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
	$input.change(function(evt){
			validateFiles(evt.originalEvent.target.files);
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
			var valid = true;
			var files = evt.originalEvent.dataTransfer.files;
			validateFiles(files);
		});
	// Prevent drag and drop on rest of page
	$window
		.on("dragover", function (evt) {
			evt.preventDefault();
		})
		.on("drop", function (evt) {
			evt.preventDefault();
		});

	function validateFiles(files){
		var valid = true;
		if(files.length > 1){
				$box.notify('For now, you can only upload a single image at a time.', {
					clickToHide: true,
					autoHide: false,
					elementPosition: 'bottom center',
					className: 'error',
				})
				valid = false;
			}
			if(files[0].size > 20 * 1024 * 1024){
				$box.notify('Sorry, we only accept files up to 20mb.', {
					clickToHide: true,
					autoHide: false,
					elementPosition: 'bottom center',
				 	className: 'error',
				})
				valid = false;
			}
			if(!files[0].type.match('image')){
				$box.notify('We\'re an image host, silly. Upload an image.', {
					clickToHide: true,
					autoHide: false,
					elementPosition: 'bottom center',
					className: 'error',
				})
				valid = false;
			}
			if(valid){
				$box.addClass('drop-valid');
				var reader = new FileReader();
				reader.onload = function (e) {
					$('#preview-img').attr('src', e.target.result);
					$input.submit();
				};
				reader.readAsDataURL(files[0]);
			}
	}
});
