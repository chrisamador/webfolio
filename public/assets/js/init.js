define(["scrollView","utls"],function(e,n){return function(){function t(){l.scrollTop()>40?o.addClass("scrolled-view"):o.removeClass("scrolled-view")}var o=n(document.getElementById("header")),l=n(window),c=n(document),s=n(document.documentElement),d=n(document.getElementById("mobile-btn")),i=n(document.getElementById("side-nav")),u=n(document.body),a=n(document.getElementById("loading-screen"));u_footerBtn=n(document.getElementById("btnToTop")),s.replaceClass("no-js","js-on"),t(),d.on("click",function(e){e.preventDefault(),this.blur(),n(this).toggleClass("is-active"),i.toggleClass("is-active")}),u_footerBtn.on("click",function(e){e.preventDefault(),u.animateScrollTop(0)}),u.addClass("is-loaded"),setTimeout(function(){a.remove(),e(),c.on("scroll touchMove",function(n){t(),e()}),l.on("resize",function(n){t(),e()})},1680)}});