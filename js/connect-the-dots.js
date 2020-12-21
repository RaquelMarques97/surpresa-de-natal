/*
 *
 * Game of 'Connect the dots' using jquery & CSS3
 *
 */
function playgame() {
	playAudio();
	$('#canvas3').css('display', 'none');
	$('.playgame').css('display', 'none');
	$('#send').css('display', 'block');
	$('#send').css('pointer-events', 'none');
	$('.send').css('opacity', '0.2');

}

function playAudio() {
	music.play();
	$('.pause').css('display', 'block');
	$('.play').css('display', 'none');
}

function pauseAudio() {
	music.pause();
	$('.play').css('display', 'block');
	$('.pause').css('display', 'none');
}

var musicoh = document.getElementById("hohoho");

function playHohoho() {
	musicoh.play();
}

var music = document.getElementById("myAudio");
$(document).ready(function () {

	var music = document.getElementById("myAudio");
	music.play();



	var musicrash = document.getElementById("crash");

	function playCrash() {
		musicrash.play();
	}


	//coordinates of the 'dots'
	var coords = [
		[187, 4],
		[371, 0],
		[372, 150],
		[394, 209],
		[400, 253],
		[381, 302],
		[335, 337],
		[430, 395],
		[487, 506],
		[445, 641],
		[345, 707],
		[229, 715],
		[125, 660],
		[60, 540],
		[105, 412],
		[225, 340],
		[180, 310],
		[157, 255],
		[165, 210],
		[190, 165],
		[187, 20]

	];

	//draw all the dots
	for (i = 0; i < coords.length; i++) {

		css = {
			left: coords[i][0] - 6,
			top: coords[i][1] - 17,
			zIndex: coords.length - i //to ensure lower numbers are on top of higher ones in case of overlap
		}

		//set the first dot active
		class_active = (i == 0) ? ' active' : '';

		// html/css for the dot
		div = $('<div id="dot_container_' + i + '" order_value="' + i + '" class="dot_container' + class_active + '"><div class="dot"></div><div class="dot_number">' + (i + 1) + '</div></div>').css(css);

		//add the dot to the page
		$('#canvas').append(div);
	}


	// when a dot is clicked, join it with a line to the previous dot
	$('.dot_container').click(function () {

		if ($(this).hasClass('active')) { //check if active class has been added to the dot (note: can't move this into the .click event handler as it won't work there)

			var i = parseInt($(this).attr('order_value')); //its order in the dot series

			//take active class off current dot
			$(this).removeClass('active');

			//if it's the first dot, no line to draw, just make the next dot active
			if (i == 0) {
				$('div#dot_container_' + (i + 1)).addClass('active'); //make next dot active
				return false;
			}

			//draw line from previous dot to this dot
			x1 = coords[i - 1][0];
			y1 = coords[i - 1][1];
			x2 = coords[i][0];
			y2 = coords[i][1];

			var m = (y2 - y1) / (x2 - x1); //slope of the segment
			var angle = (Math.atan(m)) * 180 / (Math.PI); //angle of the line
			var d = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1))); //length of the segment
			var transform;

			// the (css) transform angle depends on the direction of movement of the line
			if (x2 >= x1) {
				transform = (360 + angle) % 360;
			} else {
				transform = 180 + angle;
			}

			// add the (currently invisible) line to the page
			var id = 'line_' + new Date().getTime();
			var line = "<div id='" + id + "'class='line'>&nbsp;</div>";
			$('#canvas').append(line);

			//rotate the line
			$('#' + id).css({
				'left': x1,
				'top': y1,
				'width': '0px',
				'transform': 'rotate(' + transform + 'deg)',
				'transform-origin': '0px 0px',
				'-ms-transform': 'rotate(' + transform + 'deg)',
				'-ms-transform-origin': '0px 0px',
				'-moz-transform': 'rotate(' + transform + 'deg)',
				'-moz-transform-origin': '0px 0px',
				'-webkit-transform': 'rotate(' + transform + 'deg)',
				'-webkit-transform-origin': '0px 0px',
				'-o-transform': 'rotate(' + transform + 'deg)',
				'-o-transform-origin': '0px 0px'
			});

			// 'draw' the line
			$('#' + id).animate({
				width: d,
			}, 400, "linear", function () {
				//make the next dot active after the line is drawn
				if (i < coords.length)
					$('div#dot_container_' + (i + 1)).addClass('active');
			});

			//if it's the last dot, reveal the image
			if (i == coords.length - 1) {
				revealImage();
			}

		} else {
			console.log("wrong");
			playCrash();
		}

	});

	/***
	reveal the image
	***/
	var revealImage = function () {

		playHohoho();
		$('#send').css('pointer-events', 'auto');
		$('#send').css('opacity', '1');

		//fade out all the dots & lines
		$('.dot_container,.line').animate({
			opacity: 0
		}, 1000, "linear", function () {

			//then fade in the image
			$('.hidden_image').animate({
				opacity: 1
			}, 1000, "linear", function () {
				$('.hidden_image').addClass('animate');
			});

		});



	};

});

function turn() {

}