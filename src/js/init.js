define(['module/loadingscreen','jquery'], function (loadingScreen,$) {

   document.documentElement.className = document.documentElement.className.replace(/no-js/g, 'js-on');

	var sec = document.getElementsByTagName('section')[0];
		body = document.getElementById('body');


	   loadingScreen.openScreen(function(){
			sec.className += ' in-view';
			body.className += ' is-loaded';
	   })

	   var pageBlock = $('.page__block'),
	   	 footer = $('.main-footer__block');

	   	 pageBlock.css('margin-bottom', footer.height())



	   $(window).on('resize',function(){
	   	pageBlock.css('margin-bottom', footer.height())
	   })
});