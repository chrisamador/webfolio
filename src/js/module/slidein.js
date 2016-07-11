define(['jquery'],function ($) {

	var slideInEffect = function () {
		var scrollTop = window.pageYOffset,
			 windowHeight = window.innerHeight,
			 breakpoint = scrollTop + windowHeight,
			 delay = 300;

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

	$(window).on("load scroll resize", function() {
		slideInEffect();
	});

	return {}
})