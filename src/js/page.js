//

define(['jquery','page/home','page/about','page/contact','page/works'],
	function ($,homepage,about,contact,works) {

	var run = function(href){
		// Run the page functions
		switch (href) {
		    case '': 			homepage(); break;
		    case 'about': 	about(); break;
		    case 'contact': 	contact(); break;
		    case 'works': 	works(); break;
		}
	}
	return {run: run};
})
