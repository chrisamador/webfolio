<<<<<<< HEAD
/**
 *
 * App.js file
 *
 */


var docEl = document.documentElement;
docEl.className = docEl.className.replace('no-js','js');
=======
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
		scrollView : 'module/scrollView',
		domReady: 'module/domready',
		rqPageContent: 'module/rqPageContent',
		utls: 'module/utls',
		sls: 'module/simplels'
	}
})

require(['backbone','init','page', 'domReady','rqPageContent','scrollView','utls','sls'],
	function(Backbone,init,pageScript,domReady,rqPageContent,scrollView,u_,sls){

	/**
	 *
	 * Dom ready function
	 *
	 */


	domReady(function(){
		init();
		pageScript();
	});


	/**
	 *
	 * Backbone App
	 *
	 */

	var APP = {
		Stage: {},
		View : {},
		Router: {}
	}

	APP.View.SiteBody = Backbone.View.extend({
		el: document.body,
		events: {
			'click a': 'anchorClick'
		},
		initialize: function(){
			this.updateSiteMeta();
		},
		anchorClick: function(e){
			var anchorUrl = e.currentTarget.href;

			var isExternalUrl = function(url) {
		    	var domain = function(url) {
		      	return url.replace('http://','').replace('https://','').split('/')[0];
		   	};
			   return domain(location.href) !== domain(url);
			}

			// ei: works/
			var cleanUrl = function(url){
		   	var index = url.replace('http://','').replace('https://','').indexOf('/');
		   	return (url.replace('http://','').replace('https://','').substr(index) + '/').replace('//','/');
		   }

			if(isExternalUrl(anchorUrl)){
				// Is External
			}else{
				e.preventDefault();
				var url = cleanUrl(anchorUrl),
					 $ele = $(e.currentTarget);

				if($ele.hasClass('single-work__link')){
					this.workPageChange($ele, url);
				}else{
					// console.log('url: '+url);
					this.pageChange(url);
				}

			}
		},
		updateSiteMeta: function(){
			var pageName = 'bruh',
				$nav = $('.nav-links'),
				currentPos = document.location.pathname;

			// Title
			$('title').eq(0).text('Chris Amador </> Creative Front-End Developer');
			// Nav
			$nav.find('.active').removeClass('active');

			$nav.each(function(i, el){
				var $a = $(el).find('a');

				$a.each(function(i, aEl){
					// console.log(currentPos);
					// console.log(aEl.pathname + '/');
					if(currentPos.indexOf(aEl.pathname + '/') === 0){
						$(aEl).parent().addClass('active');
					}else{
						$(aEl).parent().addClass('non-active');
					}
				})

			})

			// Body class

		},
		pageChange: function(cleanAnchorUrl){
			Backbone.history.navigate(cleanAnchorUrl , { trigger: true });
		},
		workPageChange: function($ele, url){
			var self = this,
				 $body = this.$el,
			    eleTop = $ele.offset().top - $(window).scrollTop(),
			    eleLeft = $ele.offset().left,
			    eleRight = $(window).width() - (eleLeft + $ele.outerWidth()),
			    $transEle = $ele.clone();

			$transEle.css({
			  position: 'fixed',
			  zIndex: 9,
			  left: eleLeft + 'px',
			  top: eleTop + 'px',
			  right: eleRight + 'px',
			}).addClass('single-work__link--full-page');

			$body.append($transEle);

			$transEle.animate({
				left: 0,
				right: 0,
				bottom: 0,
				top: 0
			}, 600, function(){
				sls.add();
				self.el.scrollTop = 0;
				Backbone.history.navigate(url , { trigger: true });
			})
		},
		renderNewContent: function(html){
			var self = this;

			// Find page--active and make it page--old
			self.$el.find('.page--active')
				.removeClass('page--active')
				.addClass('page--old');

			var slideInNewContent = function(){
				// Remove active class on the nav buttons
				u_(document.getElementById('mobile-btn')).removeClass('is-active');
				u_(document.getElementById('side-nav')).removeClass('is-active');

				// Add New page--incoming
				self.$el.find('#header')
					.after(new APP.View.PageContent().render(html).el);

				// Move New page--incoming to the left
				setTimeout(function(){
					self.$el.find('.page--incoming').css('left','0%');
					self.updateSiteMeta();
				},100);

				// Wait 1s to make page--incoming to page--active and remove page--old
				setTimeout(function(){
					self.$el.find('.page--incoming')
						.addClass('page--active')
						.removeClass('page--incoming')

					self.el.scrollTop = 0;
					self.$el.find('.page--old').remove();
					self.$el.find('.single-work__link--full-page').remove();

					setTimeout(function(){
						APP.Stage.Trans = false;
						pageScript();
						scrollView();
						sls.remove();
					},100)

				}, 1100);
			}

			// Scroll to top if the not at the top
			// if(this.el.scrollTop > 0){

			// 	self.$el.animate({ scrollTop: "0" }, 500, function(){
			// 		slideInNewContent();
			// 	});

			// }else{
				slideInNewContent();
			// }

			return this;
		}
	})

	APP.View.PageContent = Backbone.View.extend({
		className: 'page page--incoming',
		render: function(html){
			this.$el.html(html);

			return this;
		}
	});

	APP.Router.Main = Backbone.Router.extend({
		initialize: function(){
			// console.log('router init');
		},
		routes: {
			'': 'home',
			':pageName/': 'page',
			'works/:workName/': 'work'
		},
		loader: function(name){
			if(APP.Stage.InitLoad){
				APP.Stage.InitLoad = false;
			}else{

				// Start Trans
				APP.Stage.Trans = true;
				rqPageContent(name,function(err,html){
					if(err){

					}else{
						APP.Stage.SiteBody.renderNewContent(html);
					}
					// Finish Trans
				});
			}
			// console.log('router: ' + name);
		},
		home: function(){
			this.loader('');
		},
		page: function(pageName){
			this.loader(pageName + '/');
		},
		work: function(workName){
			this.loader('works/' + workName + '/');
		}
	});


	_.extend(APP.Stage, Backbone.Events);
	APP.Stage.InitLoad = true;
	APP.Stage.Trans = false;
	APP.Stage.SiteBody = new APP.View.SiteBody();
	APP.Stage.Router = new APP.Router.Main();
	Backbone.history.start({ pushState: true });

	window.STAGE = APP.Stage;

});



// function cloner($ele){

// 		var $body = $('.body'),
// 		    eleTop = $ele.offset().top - $(window).scrollTop(),
// 		    eleLeft = $ele.offset().left,
// 		    eleRight = $(window).width() - (eleLeft + $ele.outerWidth()),
// 		    $transEle = $ele.clone();

// 		$transEle.css({
// 		  position: 'fixed',
// 		  zIndex: 9,
// 		  left: eleLeft + 'px',
// 		  top: eleTop + 'px',
// 		  right: eleRight + 'px',
// 		});

// 		$body.append($transEle);

// 		$transEle.animate({
// 			left: 0,
// 			right: 0,
// 			bottom: 0,
// 			top: 0
// 		}, 1000)
// 	}
>>>>>>> 4ec0fbcd85b0c1ea60a9c6a95be278d6cb413153
