define(['module/loadingscreen'], function (loadingScreen) {

   document.documentElement.className = document.documentElement.className.replace(/no-js/g, 'js-on');

	var sec = document.getElementsByTagName('section')[0];
		body = document.getElementById('body');



	   loadingScreen.openScreen(function(){
			sec.className += ' in-view';
			body.className += ' is-loaded';
	   })


});