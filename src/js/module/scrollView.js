define(['jquery','utls'],function ($,u_) {

	var slideInEffect = function () {
		var scrollTop = window.pageYOffset,
			 windowHeight = window.innerHeight,
			 breakpoint = scrollTop + windowHeight,
			 delay = 300;

		// $("[data-view-scroll]").not(".in-view").each(function() {

		$("[data-view-scroll]").not(".in-view").each(function() {
			var $this = $(this);

			$this.css("transition-delay", delay + "ms");

			var elemTop = parseInt($this.offset().top, 10);
			if (elemTop + 50 <= breakpoint){
				$this.addClass("in-view");
			}

			delay += 100;
		});
	};

	return slideInEffect;

});


// define(['jquery','utls'],function ($,u_) {

// 	var scrollView = function(){
// 		var self = this;

// 		this.dataViews= undefined;

// 		this.newPage = function(){
// 			this.delay = 300;
// 			this.dataViews = document.querySelectorAll('[data-view-scroll]');

// 			scrollViewCore();
// 		}

// 		var scrollViewCore = function () {
// 			console.log('scrollViewCore');

// 			if(window.STAGE.Trans){
// 				return;
// 			}

// 			var windowHeight = window.innerHeight,
// 				delay = 300;

// 			console.log(self);


// 			for(var i = 0, v = self.dataViews.length; i < v ; i++){
// 				var u_el = u_(self.dataViews[i]);
// 				if(! u_el.hasClass('in-view')){

// 					var top = u_el.getBoundingClientRect().top;

// 					console.log('top: ' + top);
// 					console.log('windowHeight: ' + windowHeight);

// 					if(top + 50 < windowHeight){
// 						u_el.addClass('in-view');
// 						u_el.css( 'transitionDelay' , self.delay + 'ms' );



// 					}
// 					console.log('delay: ' + delay);
// 					delay += 400;

// 				}
// 			}

// 		};

// 		this.init = function(){

// 			var u_window = u_(window);
// 			var u_document = u_(document);

// 			this.newPage();

// 			u_document.on('scroll touchMove', function(e){
// 			  	scrollViewCore();
// 			});

// 	    	u_window.on('resize', function(e){
// 			  	scrollViewCore();
// 	    	});
// 		}

// 	}

// 	var sView = new scrollView();

// 	return function(){

// 		return sView;

// 	};
// })