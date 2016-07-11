define(['jquery','dReady','module/loadingscreen','module/slidein'], function ($,dReady,loadingScreen,slidein) {

	dReady(function(){
		console.log('dReady');
		loadingScreen.openScreen(function(){
			$('body').addClass('site-loaded');
		});
	});
	// }

   /*

		Footer margin

   */
   var pageBlock = $('.page__block'),
   	 footer = $('.main-footer__block');

   pageBlock.css('margin-bottom', footer.height());

   $(window).on('resize',function(){
   	pageBlock.css('margin-bottom', footer.height())
   });

   $('#btnToTop').on('click', function(e){
   	e.preventDefault();

   	$('html, body').animate({
		   scrollTop: 0
		}, 600, 'swing')
   })

});