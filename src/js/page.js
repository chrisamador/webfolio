//

define(['jquery','page/home','page/works','page/about','page/orphans'],
	function ($,home,works,about,orphans) {

	return function(){
		// Run the page functions
		switch (location.pathname) {
		    case '/': 			home(); break;
		    case '/works/': 	works(); break;
		    case '/about-contact/': 	about(); break;
		    case '/orphans/': 	orphans(); break;
		}
	}
})
