function rand(min, max) {
    return Math.floor(Math.random()*Math.random() * (max - min + 1)) + min;
}
$(document).ready(function () {

	var $i = 0,
	$box = $('.box'),
	$input = $('.input-button'),
	$window = $(window),
	$h2 = $('h2.upload-label');

	function createStar($i){
		var data = {class: 'shooting-star star-'+$i};
		$("<div>", data)
			.css({
				'animation-duration': rand(40, 120)+'s',
				'transition-delay:': rand(15, 35)+'s',
				'top': rand(0, 100)+'%',
			})
			.addClass($i%2 ? '' : 'reverse')
			.appendTo('.shooting-stars')
			.show();
	}

	while($i++ < 8)
		createStar($i);

	// Trigger select file window if window clicked
	$box.on('click', function (evt) {
		$input.trigger('click');
	});
	$input.on('click', function(evt){
		evt.stopImmediatePropagation();
	})

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
			}, 1000)
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
		if(files.length !== 1 ){
				$h2.notify('For now, you can only upload a single image at a time.', {
					clickToHide: true,
					autoHide: false,
					elementPosition: 'bottom center',
					className: 'error',
				});
				valid = false;
			}
		if(files[0].size > 20 * 1024 * 1024){
			$h2.notify('Sorry, we only accept files up to 20mb.', {
				clickToHide: true,
				autoHide: false,
				elementPosition: 'bottom center',
				className: 'error',
			});
			valid = false;
		}
		if(!files[0].type.match('image')){
			$h2.notify('We\'re an image host, silly. Upload an image.', {
				clickToHide: true,
				autoHide: false,
				elementPosition: 'bottom center',
				className: 'error',
				gap: 5,
				arrowSize: 10
			});
			valid = false;
		}
		if(valid){
			$box.addClass('drop-valid');
			var reader = new FileReader();
			reader.onload = function (e) {
				$('#preview-img').attr('src', e.target.result);
				//$input.submit();
			};
			reader.readAsDataURL(files[0]);
		}
	}
});
