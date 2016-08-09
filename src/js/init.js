define(['jquery'], function ($) {
  return function initRun() {
    console.log('Init Run!!');


    var $header = $(document.getElementById('header')),
        $window = $(window),
        $mobileBtn = $(document.getElementById('mobile-btn'));

    function headerScroll(e) {
      if($window.scrollTop() > 40){
        $header.addClass('scrolled-view');
      }else{
        $header.removeClass('scrolled-view');
      }
    };

    $(window).on('load scroll mousewheel touchMove',headerScroll)

    $mobileBtn.on('click', function $mobileBtnClick(e) {
      e.preventDefault();
      alert('cool');
    });

  }
});
