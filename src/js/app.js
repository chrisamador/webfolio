/* Steps

* Page loads with loading screen if js is on
* Homepage markup is already on page
* Backbone router kicks in and checks the url and loads the screen
* On})

*/


// Starting point
require.config({
	waitSeconds: 30,
	paths: {
		backbone: 'libs/backbone',
		jquery: 'libs/jquery',
		underscore: 'libs/underscore',
		fullscreen : 'module/fullscreen',
		dReady: 'module/domready'

	}
})

require(['backbone','init','page'], function(Backbone,init,page){

	document.documentElement.className = document.documentElement.className.replace(/no-js/g, 'js-on');

	var requestPageContent = function(url,cb){
		//console.log("loaded: " + url);
		var request = new XMLHttpRequest(),
			 markup;
		request.open('GET', '/' + url , true)

		request.onload = function(){
			if (request.status >= 200 && request.status < 400) {
				// Success!

				var start = "<!-- ##Start## -->";
				var end = "<!-- ##End## -->";
				markup = request.responseText.substr(request.responseText.indexOf(start) + start.length);
				markup = markup.substr(0, markup.indexOf(end));

				// err, data
				cb(false,markup)
			} else {
				// We reached our target server, but it returned an error
				// err, data
				cb(true,markup)
			}

		}
		request.send();
	}


	var APP = {
		Stage: {},
		View : {},
		Collection: {},
		Model: {},
		Router: {}
	}

	APP.View.Main = Backbone.View.extend({
		el: $('body'),
		events: {
			'click .nav-btn__block' : 'navBtnClick',
			'mouseenter .nav-btn__block': 'navBtnHover',
			'mouseleave .nav-btn__block': 'navBtnHover',
			'click a': 'anchorClick'
		},
		initialize: function(){
			this.updateNavActive();

			APP.Stage.on('pageTransStart', this.pageTransitionStart, this);
			APP.Stage.on('pageTransEnd', this.pageTransitionEnd, this);
			APP.Stage.on('updateNav', this.updateNavActive, this);
		},
		navBtnClick: function(e){
			e.preventDefault();
			this.$el.removeClass('hover-nav').removeClass('hover-off-nav');
	   	this.$el.toggleClass('active-nav');
		},
		anchorClick: function(e){
			//console.dir(e.currentTarget);
			var hrefLink = e.currentTarget.dataset.href;
			if(hrefLink){
				e.preventDefault();
				Backbone.history.navigate(hrefLink , { trigger: true });
			}
		},
		navBtnHover: function(e){
			if(e.type == "mouseenter"){
				this.$el.removeClass('hover-off-nav').addClass('hover-nav');
			}else{
				this.$el.removeClass('hover-nav').addClass('hover-off-nav');
			}
		},
		pageTransitionStart: function(){
			var self = this;

			// Turns off the active nav if there is one
			self.$el.removeClass('active-nav');

			this.$el.addClass('transition-start');
		},
		pageTransitionEnd: function(){
			var self = this;

			this.$el.removeClass('transition-start').addClass('transition-end');
			setTimeout(function(){
				self.$el.removeClass('transition-end')
			},1000)
			this.updateNavActive();
		},
		updateNavActive: function(){
			var mainNav = $('#nav-links__main-output'),
				 footerNav = $('#nav-links__footer-output'),
				 currentPos = document.location.pathname;

			mainNav.find('li').removeClass('active'),
			footerNav.find('li').removeClass('active');

			var check = function(el){
				if(currentPos.length == 1 && el.dataset.href.length == 1){
					$(el).parent().addClass('active');
					return;
				}
				if(currentPos.indexOf(el.dataset.href, 1) === 1){
					$(el).parent().addClass('active');
				}
			}

			_.each(mainNav.find('a'), check);
			_.each(footerNav.find('a'), check);
		}
	})

	APP.View.SinglePage = Backbone.View.extend({
		initialize: function(options){
			this.html = options.html;
		},
		className: 'page__block__inner',
		render: function(){
			this.el.innerHTML = this.html;
			return this;
		}
	});


	APP.Model.Work = Backbone.Model.extend({});

	APP.Collection.Works = Backbone.Collection.extend({
	  model: APP.Model.Work,
	  initialize: function(options){
	  	this.state = 'home';
	  }
	});


	APP.Router.Main = Backbone.Router.extend({
	  initialize: function (options) {
	  	this.works = options.works;
	  	this.el = $('.page__block');
	  },
	  routes: {
	    '': 'homePage',
	    ':name/': 'loadPage',
	    ':name': 'loadPage',
	    'works/:workName/': 'workPage',
	    'works/:workName': 'workPage'
	  },
	  homePage: function(){
	  		this.loadPage('');
	  },
	  workPage: function(workName){
	  		this.loadPage(workName, 'works/');
	  },
	  loadPage: function (name, prefix) {
	  		var self = this,
	  			 pageName = (prefix ? prefix : '') + name,
	  			 pageInView;

	  		if(APP.Stage.isInitLoaded){
	  			APP.Stage.isInitLoaded = false;
	  			page.run(name);
	  			return;
	  		}

	  		//# Trigger page change
	  		APP.Stage.trigger('pageTransStart');

	  		requestPageContent(pageName, function(err,html){
				if(!err){
					// Page content has been received!

					// remove old page class and add the new one TODO: write non jquery version
					var body = $('body'),
						oldClass = $('body').attr('class').match(/page-\w+/g).toString();
					body.removeClass(oldClass).addClass('page-' + (name == ""? "home": name));

					pageInView = new APP.View.SinglePage({html:html});

			  		// pageInView.
				}else{
					//# show 404 page
					pageInView = new APP.View.SinglePage({html:"error"});
				}

				setTimeout(function(){
					document.body.scrollTop = 0;

					self.el.empty()
			  		.append(pageInView.render().el);

			  		// Run page functions
			  		page.run(name);

					APP.Stage.trigger('pageTransEnd');
				},500)

	  		});
	  }
	});


	_.extend(APP.Stage, Backbone.Events);

	APP.Stage.isInitLoaded = true;

	APP.Stage.projectsList = new APP.Collection.Works();

	APP.Stage.bodyView = new APP.View.Main();

	APP.Stage.router = new APP.Router.Main({
	    projects: APP.Stage.projectsList
	});

	Backbone.history.start({ pushState: true });

});


// async.parallel([
// 	function (cb) { //Loads section into container, if not index
// 		async.waterfall([
// 			function (cb) {
// 				$.get(url, function (data) {
// 					var start = "<!-- CONTENT START -->";
// 					var end = "<!-- CONTENT END -->";
// 					data = data.substr(data.indexOf(start) + start.length);
// 					data = data.substr(0, data.indexOf(end));

// 					sectionInfo.$container.html(data);

// 					cb();
// 				});
// 			},
// 			function (cb)
// 			{
// 				if (sectionInfo.isProject)
// 				{
// 					var $img = sectionInfo.$container.find("img").eq(0);
// 					if ($img.length)
// 					{
// 						sectionInfo.$container.waitForImages({
// 							finished: function () {
// 								cb();
// 							}
// 						});

// 						/*var timeout = setTimeout(cb, 3000);
// 						sectionInfo.$container.find("img").eq(0).load(function () {
// 							if (timeout && cb)
// 							{
// 								clearTimeout(timeout);
// 								cb();

// 								timeout = null;
// 								cb = null;
// 							}
// 						});*/
// 					}
// 					else
// 					{
// 						cb();
// 					}
// 				}
// 				else
// 				{
// 					cb();
// 				}
// 			}
// 		], cb);
// 	},
// 	function (cb) {
// 		$projectsFrame.addClass("all-anim");
// 		$home.addClass("out");
// 		$home.addClass("only-current-project");

// 		//Updates header
// 		$header.addClass("detail");

// 		$home.removeClass("text-out-right text-out-left");

// 		if (sectionInfo.position == "left")
// 		{
// 			$home.addClass("text-out-right");
// 		}
// 		else
// 		{
// 			$home.addClass("text-out-left");
// 		}

// 		//Does a zoom in if it's from index
// 		var animEnd = false;
// 		if (lastSectionInfo.isIndex)
// 		{
// 			//$.fn.fullpage.setAllowScrolling(false);

// 			$.fn.projectsScroll.enabled = false;

// 			if (sectionInfo.isProject)
// 			{
// 				$home.addClass("full");
// 				resize();

// 				//$.fn.fullpage.reBuild();

// 				$nav.transitionEnd(function () {
// 					$("body").addClass("loading");

// 					cb();
// 				});
// 			}
// 			else
// 			{
// 				// lastProjectIndex = $projects.filter(".active").index();

// 				$("body").addClass("loading");
// 				cb();
// 			}
// 		}
// 		else
// 		{
// 			$("body").addClass("loading");

// 			if (isBetweenProjects)
// 			{
// 				lastSectionInfo.$container.addClass("page-up");
// 				sectionInfo.$container.css({ position: "fixed" });
// 			}
// 			else
// 			{
// 				var pos = lastSectionInfo.position;

// 				if (lastSectionInfo.position == "left" && sectionInfo.position == "left")
// 				{
// 					pos = "right";
// 				}

// 				lastSectionInfo.$container.addClass("page-" + pos);
// 			}


// 			lastSectionInfo.$container.css({ zIndex: 500, position: "absolute", top: 0 });
// 			sectionInfo.$container.css({ zIndex: 400 });

// 			cb();
// 		}

// 		if (sectionInfo.isProject)
// 		{
// 			/*lastProjectIndex = $a.index();

// 			//$.fn.fullpage.allowAnimation = false;
// 			//$.fn.fullpage.moveTo(lastProjectIndex + 1, 0);
// 			$projectsWrapper.css(getTransforms('translate3d(0px, -' + (projectsHeight * lastProjectIndex) + 'px, 0px)'));
// 			//$.fn.fullpage.allowAnimation = true;
// 			*/
// 		}
// 	}
// ], function (err, results) {
// 	$("body").removeClass("loading");

// 	if (sectionInfo.isInverted)
// 	{
// 		$("body").addClass("section-inverted");
// 	}
// 	else
// 	{
// 		$("body").removeClass("section-inverted");
// 	}

// 	$home.removeClass("out-from-left out-from-right");
// 	$home.addClass("out-from-" + sectionInfo.position);

// 	sectionInfo.$container.show();
// 	sectionInfo.$container[0].offsetHeight;
// 	sectionInfo.$container.removeClass("page-left page-right page-up page-down");

// 	if (!scrollToTop)
// 	{
// 		// console.log("scroll to top seco");
// 		$("html, body").stop().css({ scrollTop: "0px" });
// 	}

// 	// console.log("aep");

// 	$(window).trigger("content-change");

// 	$(".in-view").removeClass("in-view");

// 	sectionInfo.$container.transitionEnd(function () {
// 		$projectsFrame.removeClass("all-anim");

// 		if (lastSectionInfo.isIndex)
// 		{
// 			$home.hide();
// 			$home[0].offsetHeight;
// 		}
// 		else
// 		{
// 			// console.log("ups?");
// 			lastSectionInfo.$container
// 				.hide()
// 				.html("")
// 				.css({
// 					position: "relative",
// 					top: "auto"
// 				})
// 				.removeClass("page-left page-right page-up page-down");
// 		}

// 		lastSectionName = sectionName;

// 		sectionInfo.$container.css({ position: "relative" });

// 		// $("html, body").stop().css({ scrollTop: "0px" });

// 		$.enableMouse(true);

// 		$("html, body").removeClass("disable-scroll");
// 	});
// });
// }
// else
// {
// scrollToTop = false;

// lastSectionInfo.$container.addClass("page-" + lastSectionInfo.position);

// $home.show();
// $home[0].offsetHeight;

// $projectsFrame.addClass("all-anim");

// $("body").removeClass("loading section-inverted");
// $home.removeClass("out-from-left out-from-right text-out-left text-out-right");

// /*
// //$.fn.fullpage.moveTo(lastProjectIndex + 1, 0);
// $projectsWrapper.css(getTransforms('translate3d(0px, -' + ($projects.height() * lastProjectIndex) + 'px, 0px)'));
// */

// $projectsFrame.transitionEnd(function (e) {
// 	lastSectionInfo.$container.hide();
// 	lastSectionInfo.$container.html("");

// 	// console.log("scroll to top SECO to home 1");
// 	$("html, body").stop().css({ scrollTop: "0px" });

// 	$("html, body").addClass("disable-scroll");

// 	$home.removeClass("full out");
// 	resize();

// 	$header.removeClass("detail");

// 	$.fn.projectsScroll.enabled = true;

// 	// //$.fn.fullpage.reBuild();
// 	//$.fn.fullpage.setAllowScrolling(true);

// 	// console.log($projects.height());

// 	// //$.fn.fullpage.allowAnimation = false;
// 	// //$.fn.fullpage.moveTo(lastProjectIndex + 1, 0);
// 	// $projectsWrapper.css(getTransforms('translate3d(0px, -' + ($projects.height() * lastProjectIndex) + 'px, 0px)'));
// 	// //$.fn.fullpage.allowAnimation = true;

// 	$nav.transitionEnd(function () {
// 		lastSectionName = sectionName;

// 		$projectsFrame.removeClass("all-anim");

// 		$home.removeClass("only-current-project");

// 		// console.log("scroll to top SECO to home");
// 		$("html, body").stop().css({ scrollTop: "0px" });

// 		//console.log($projects.height());

// 		/*
// 		//$.fn.fullpage.allowAnimation = false;
// 		//$.fn.fullpage.moveTo(lastProjectIndex + 1, 0);
// 		$projectsWrapper.css(getTransforms('translate3d(0px, -' + (projectsHeight * lastProjectIndex) + 'px, 0px)'));
// 		//$.fn.fullpage.allowAnimation = true;
// 		*/

// 		$.enableMouse(true);
// 	});
// });
// }

// if (scrollToTop)
// {
// // console.log("scroll to top animated");
// $("html, body").animate({ scrollTop: "0px" }, 800, "easeInOutQuint");
// }
// }

// var configureLinks = function () {
// $(".open-inside").off("click", linkClick).on("click", linkClick);
// }

// var linkClick = function (e) {
// var url = $(this)
// 			.attr("href")
// 			.split(".html")
// 			.join("");

// $.address.value(url);

// e.preventDefault();
// return false;
// };
// }