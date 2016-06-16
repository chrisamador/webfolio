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
			'click .nav-btn__block' : 'navClick',
			'click .nav-links a': 'navClick'
		},
		navClick: function(e){
			e.preventDefault();
			var loc = e.target.dataset.href;
			console.log(loc);
			Backbone.history.navigate(loc, { trigger: true });
		}
	})

	APP.View.SinglePage = Backbone.View.extend({
		initialize: function(options){
			this.name = options.name
		},
		className: 'page__block__inner',
		render: function(){
			this.el.innerHTML = "<h1>This: " + this.name + "</h1>";
			return this
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
	    '': 'home',
	    'about': 'about',
	    'works': 'works',
	    'orphans': 'orphans',
	    'contact': 'contact'
	  },
	  home: function () {
	  		console.log('home yo');

	  		this.el.empty()
	  		.append(new APP.View.SinglePage({name:'home'}).render().el);

	  		//Backbone.history.navigate('contacts', { trigger: true });
	  },
	  about: function(){
	  		this.el.empty()
	  		.append('<h1>about</h1>');
	  },
	  works: function(){
	  		this.el.empty()
	  		.append('<h1>works</h1>');
	  },
	  orphans: function(){
	  		this.el.empty()
	  		.append('<h1>orphans</h1>');
	  }
	});

	APP.Stage.projectsList = new APP.Collection.Works(data);

	APP.Stage.bodyView = new APP.View.Main();

	APP.Stage.router = new APP.Router.Main({
	    projects: APP.Stage.projectsList
	});

	Backbone.history.start({ pushState: true });

});