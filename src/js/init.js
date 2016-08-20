define(['jquery','slideIn'], function ($,slideIn) {
  return function init() {



   var $header = $(document.getElementById('header')),
   	$window = $(window),
   	$mobileBtn = $(document.getElementById('mobile-btn')),
   	$body = $('body'),
 		$screen = $('#loading-screen');


   /**
    *
    * header scroll
    *
    */


   function headerScroll() {
   	if($window.scrollTop() > 40){
        $header.addClass('scrolled-view');
      }else{
        $header.removeClass('scrolled-view');
      }
   };


   headerScroll();


   /**
    *
    * mobile btn
    *
    */


   $mobileBtn.on('click', function $mobileBtnClick(e) {
     e.preventDefault();
     alert('cool');
   });


   /**
    *
    * scroll event
    *
    */


   /**
    *
    * loading screen
    *
    */

    $body.addClass('is-loaded');

    setTimeout(function(){

    	$screen.remove();
    	slideIn();

    	$(window).on('scroll touchMove resize', function(e){
		  	slideIn();
		  	headerScroll(e);
		});


    }, 1900);

  }
});
