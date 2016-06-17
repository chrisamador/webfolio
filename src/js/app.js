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
		underscore: 'libs/underscore'
	}
})

require(['backbone','init','views','data/works'], function(Backbone,init,views,data){

	var requestPageContent = function(url,cb){
		console.log(url)
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

				cb(false,markup)
			} else {
				// We reached our target server, but it returned an error
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
			'click .nav-links a': 'navClick'
		},
		initialize: function(){
			APP.Stage.on('pageTransStart', this.pageTransitionStart, this);
			APP.Stage.on('pageTransEnd', this.pageTransitionEnd, this);
		},
		navBtnClick: function(e){
			e.preventDefault();
			content.log('nav btn clicked');
		},
		navClick: function(e){
			e.preventDefault();
			var loc = e.target.dataset.href;
			Backbone.history.navigate(loc , { trigger: true });
		},
		pageTransitionStart: function(){
			console.log('start trans')
		},
		pageTransitionEnd: function(){
			console.log('end trans')
		}
	})

	APP.View.SinglePage = Backbone.View.extend({
		initialize: function(options){
			this.href = options.href;
			this.html = options.html;
		},
		className: 'page__block__inner',
		render: function(){
			this.el.innerHTML = this.html;
			return this;
		}
	})

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
	    ':name': 'loadPage'
	  },
	  homePage: function(){
	  		if(!APP.Stage.initLoad){
	  			this.loadPage('');
	  		}else{
	  			APP.Stage.initLoad = false
	  		}
	  },
	  loadPage: function (name) {
	  		var self = this;

	  		//# Trigger page change
	  		APP.Stage.trigger('pageTransStart');

	  		requestPageContent(name,function(err,html){
				if(!err){
					var pageInView = new APP.View.SinglePage({href:name,html:html});

					document.body.scrollTop = 0;

					self.el.empty()
			  		.append(pageInView.render().el);

			  		// pageInView.
				}else{
					//# show 404 page
				}
				APP.Stage.trigger('pageTransEnd');
	  		});
	  }
	});


	_.extend(APP.Stage, Backbone.Events);

	APP.Stage.initLoad = (document.location.pathname == '/');

	APP.Stage.projectsList = new APP.Collection.Works(data);

	APP.Stage.bodyView = new APP.View.Main();

	APP.Stage.router = new APP.Router.Main({
	    projects: APP.Stage.projectsList
	});

	Backbone.history.start({ pushState: true });

});