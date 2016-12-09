define(['jquery'],function ($) {

	var stage = {
		moving: false,
		jsScrolling: false,
		running: true,
		breakPoints : {
			top: 0,
			bottom: 0
		},
		lastScrollTop: 0,
		currentPosition: -1,
		initLoad: true,
		$sections: []
	},pagerEl = $('#pager');


	var pagerInit = function(){
		pagerEl.empty();

		if(stage.$sections.length == 1){
			return;
		}

		stage.$sections.each(function(i,el){
			var name = $(el).attr('data-name');
			pagerEl.append('<li data-index ="'+ i +'"> <span>'+ name +'</span> </li>');
		});

		pagerEl.on('click', pagerClick);

		pagerUpdate();
	}

	var pagerClick = function(e){
		var $li;

		console.log(e);

		if(stage.jsScrolling){
			return;
		}

		if(e.target.tagName == "SPAN"){
			$li = $(e.target).parent();
		}else{
			$li = $(e.target);
		}

		var index = parseInt( $li.attr('data-index') );

		stage.jsScrolling = true;

		moveToEl( stage.$sections.eq(index) );
	}

	var pagerUpdate = function(){
		var i = stage.currentPosition;
		pagerEl.find('.active').removeClass('active');
		pagerEl.find('li').eq(i).addClass('active');
	}

	var currentSection = function(){
		return stage.$sections.eq(stage.currentPosition);
	}

	var moveToEl = function($el){
		//console.log('moveToEl')
		stage.moving = true;

		$('html, body').animate({
		   scrollTop: $el.offset().top
		}, 500, 'swing', function(){

			stage.jsScrolling = false;
			stage.moving = false;
		});
	}

	var sectionUpdate = function(index){
		console.log('sectionUpdate');
		var oldSection = currentSection(),
			 newSection;

		checkCurrentPos();

		newSection = currentSection();

		// console.log(oldSection);
		// console.log(newSection);

		// Making sure it's a new sections in view
		if(oldSection.attr('data-index') !== newSection.attr('data-index') || stage.initLoad){
			console.log('new section found');

			stage.initLoad = false;
			oldSection.removeClass('in-view');
			newSection.addClass('in-view').addClass('view-loaded');

			if(!stage.moving && !stage.jsScrolling){
				moveToEl(newSection);
			}
			pagerUpdate();
		}

	}

	var checkCurrentPos = function(){
		var padding = Math.floor(window.innerHeight / 3),
			 windowScrollTop = $(window).scrollTop();

		stage.$sections.each(function(i,el){
			if(el.offsetTop - padding <= windowScrollTop && el.offsetTop + el.offsetHeight - padding > windowScrollTop){
				stage.currentPosition = i;
			}
		});
	}


	var scrolling = function(e){
		console.log('scrolling...');
		if(stage.moving){
			e.preventDefault();
		}

		sectionUpdate();
	}


	console.log('beep boop scroll config');
	$(window).on('scroll mousewheel touchMove', scrolling);

	var init = function(){
		window.fullpage = stage;

		stage.$sections = $('.page-section__block');

		stage.$sections.each(function(i,el){
			el.dataset.index = i;
		})

		sectionUpdate();

		pagerInit();
	}

	var run = function(){
		//stage.currentPosition = 0;
		stage.initLoad = true;
		init();

	}

	return {
		run : run
	}
})



	// var setBreakPoints = function(){
	// 	var curPosition = currentSection(),
	// 		 padding = window.innerHeight / 4,
	// 		 top = curPosition.offset().top - padding,
	// 		 bottom = curPosition.offset().top + curPosition.outerHeight() + padding;

	// 	stage.breakPoints.top = (top < 0 ? 0 : top);
	// 	stage.breakPoints.bottom = (bottom > document.body.offsetHeight ? document.body.offsetHeight : bottom);
	// }


// var moveUp = function(){
	// 	if(document.body.scrollTop < stage.breakPoints.top){
	// 		var newIndex = stage.currentPosition - 1,
	// 			 $newSection = $sections.eq( (newIndex <= 0 ? 0  : newIndex) );
	// 		stage.running = true;
	// 		moveToEl($newSection)
	// 	}
	// }

	// var moveDown = function(){
	// 	if(document.body.scrollTop + window.innerHeight > stage.breakPoints.bottom){
	// 		var newIndex = stage.currentPosition + 1,
	// 			 $newSection = $sections.eq(newIndex);

	// 		if(newIndex >= $sections.length){
	// 			stage.running = false;
	// 		}else{
	// 			moveToEl($newSection);
	// 		}
	// 	}
	// }

	// var scrollWheel = function(e){
	// 	if(stage.moving){
	// 		e.preventDefault();
	// 		return;
	// 	}

	// 	if(stage.lastScrollTop > document.body.scrollTop){
	// 		// move up
	// 		stage.lastScrollTop = document.body.scrollTop;
	// 		moveUp();
	// 	}else if(stage.running){
	// 		// move down
	// 		stage.lastScrollTop = document.body.scrollTop;
	// 		moveDown();
	// 	}
	// }