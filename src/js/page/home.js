define(['jquery','utls'],function ($,u_) {
	return function(){

		var clickX = [],
			clickY = [],
			clickDrag = [],
			paint;

		var context = document.getElementById('canvas').getContext('2d'),
			homeIntro = document.getElementById('home-intro'),
			$homeIntro = $(homeIntro),
			$btn = $homeIntro.find('.home-canvas__button'),
			$canvas = $(context.canvas);

		u_(document.getElementById('arrow-down')).on('click', function(){
			// console.log($homeIntro.offset().top);
			u_(document.body).animateScrollTop($homeIntro.offset().top);
		});

		/**
		 *
		 * Canvas
		 *
		 */
	
		$canvas.attr('height',  $homeIntro.outerHeight() + 'px');
  		$canvas.attr('width',  $homeIntro.width() + 'px');

		$(window).on('load resize', function () {
			$canvas.attr('height',  $homeIntro.outerHeight() + 'px');
    	$canvas.attr('width',  $homeIntro.width() + 'px');
		})

		function addPosition(x, y, dragging){
		  clickX.push(x);
		  clickY.push(y);
		  clickDrag.push(dragging);
		}

		function canvasDraw(){
		  //clearCanvas();

		  context.strokeStyle = "#737067";
		  context.lineJoin = "round";
		  context.lineWidth = 2;

		 for(var i=0; i < clickX.length; i++) {
		    context.beginPath();
		    if(clickDrag[i] && i){
		      context.moveTo(clickX[i-1], clickY[i-1]);
		    }else{
		       context.moveTo(clickX[i]-1, clickY[i]);
		    }
		    context.lineTo(clickX[i], clickY[i]);
		    context.closePath();
		    context.stroke();
		  }

			if(clickX.length > 100){
				clickX = [];
				clickY = [];
				clickDrag = [];
			}

		}

		function clearCanvas() {
			context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		}

		context.strokeStyle = "#737067";
		context.lineJoin = "round";
		context.lineWidth = 2;

		$canvas.on('mousedown', function(e){
			var mouseX = e.pageX - homeIntro.offsetLeft,
					mouseY = e.pageY - homeIntro.offsetTop;

		  paint = true;

		  addPosition(e.pageX - homeIntro.offsetLeft, e.pageY - homeIntro.offsetTop);
		  canvasDraw();
		});

		$canvas.on('mousemove', function(e){
		  if(paint){
				$btn.removeClass('hidden');
		    addPosition(e.pageX - homeIntro.offsetLeft, e.pageY - homeIntro.offsetTop, true);
		    canvasDraw();
		  }
		});

		$btn.on('click', function(e) {
			e.preventDefault();
			clearCanvas();
			clickX = [];
			clickY = [];
			clickDrag = [];
			$(this).animate({
				opacity: 0
			}, 500, function () {
				$(this).css('opacity', 1).addClass('hidden');
			});
		})

		$canvas.on('mouseup mouseleave', function(e){
		  paint = false;

		});
	}
});
