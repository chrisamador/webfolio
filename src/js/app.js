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
		underscore: 'libs/underscore',
		fullscreen : 'module/fullscreen',
		domReady: 'module/domready'
	}
})

require(['backbone','init','page'], function(Backbone,init,page){
	init();
	document.documentElement.className = document.documentElement.className.replace(/no-js/g, 'js-on');

	if (location.pathname === '/') {
		page.run('');
	}


function cloner($ele){

var $body = $('.body'),
    eleTop = $ele.offset().top - $(window).scrollTop(),
    eleLeft = $ele.offset().left,
    eleRight = $(window).width() - (eleLeft + $ele.outerWidth()),
    $transEle = $ele.clone();

$transEle.css({
  position: 'fixed',
  zIndex: 9,
  left: eleLeft + 'px',
  top: eleTop + 'px',
  right: eleRight + 'px',
});

$body.append($transEle);

$transEle.animate({

left: 0,
right: 0,
bottom: 0,
top: 0

}, 1000)


}


});
