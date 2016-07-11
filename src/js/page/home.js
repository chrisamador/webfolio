define(function () {
return function(){

	// var sec = document.getElementsByTagName('section')[0];

	// setTimeout(function(){
	// 	sec.className += ' in-view';
	// },500)

	var flkty = new Flickity( '.work-slider__wrapper', {
		wrapAround : true,
		arrowShape: "M12.9980337,40.3819871 L100.707107,40.3819871 L100.707107,46.7220851 L12.7478899,46.7220851 L48.4336888,82.4078841 L43.9505625,86.8910104 L5.21978644,48.1602343 L5.11462323,48.2653975 L0.631496898,43.7822712 L0.736660116,43.677108 L0.631496898,43.5719448 L5.11462323,39.0888185 L5.21978644,39.1939817 L43.9505625,0.463205617 L48.4336888,4.94633194 L12.9980337,40.3819871 Z"
	});

	$('#btn-selected-works').on('click', function(e){
   	e.preventDefault();

   	$('html, body').animate({
		   scrollTop: $('#selected-works').offset().top
		}, 600, 'swing')
	})
}
});