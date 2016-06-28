//

define(['page/home','page/about','page/contact'],function (homepage,about,contact) {

	var run = function(href){
		switch (href) {
		    case '': 			homepage(); break;
		    case 'about': 	about(); break;
		    case 'contact': 	contact(); break;
		}
	}
	return {run: run};
})