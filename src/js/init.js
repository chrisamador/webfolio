define(['scrollView','utls'], function (scrollView,u_) {
  return function init() {




   var u_header = u_(document.getElementById('header')),
   	u_window = u_(window),
   	u_document = u_(document),
   	u_html = u_(document.documentElement),
   	u_mobileBtn = u_(document.getElementById('mobile-btn')),
    u_sideNav = u_(document.getElementById('side-nav')),
   	u_body = u_(document.body),
 		u_screen = u_(document.getElementById('loading-screen'));
 		u_footerBtn = u_(document.getElementById('btnToTop'));


  	u_html.replaceClass('no-js','js-on');

   /**
    *
    * header scroll
    *
    */


   function headerScroll() {
   	if(u_window.scrollTop() > 40){
        u_header.addClass('scrolled-view');
      }else{
        u_header.removeClass('scrolled-view');
      }
   };


   headerScroll();


   /**
    *
    *  btn clicks
    *
    */


    u_mobileBtn.on('click', function(e) {
      e.preventDefault();
      this.blur();
      u_(this).toggleClass('is-active');
      u_sideNav.toggleClass('is-active');
    });

   u_footerBtn.on('click', function(e){
     	e.preventDefault();
     	u_body.animateScrollTop(0);
   })


   /**
    *
    * loading screen
    *
    */

    u_body.addClass('is-loaded');

    setTimeout(function(){

    	u_screen.remove();
    	scrollView();


    	u_document.on('scroll touchMove', function(e){
		  	headerScroll();
		  	scrollView();
		});

    	u_window.on('resize', function(e){
		  	headerScroll();
		  	scrollView();
    	});

    }, 1680);


  }
});
