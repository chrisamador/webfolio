define(["jquery","utls"],function(n,i){var e=function(){var i=window.pageYOffset,e=window.innerHeight,t=i+e,a=300;n("[data-view-scroll]").not(".in-view").each(function(){var i=n(this);i.css("transition-delay",a+"ms");var e=parseInt(i.offset().top,10);t>=e+10&&i.addClass("in-view"),a+=100})};return e});