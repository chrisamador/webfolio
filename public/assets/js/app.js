require.config({waitSeconds:30,paths:{backbone:"libs/backbone",jquery:"libs/jquery",underscore:"libs/underscore",scrollView:"module/scrollView",domReady:"module/domready",rqPageContent:"module/rqPageContent",utls:"module/utls",sls:"module/simplels"}}),require(["backbone","init","page","domReady","rqPageContent","scrollView","utls","sls"],function(e,t,n,a,i,o,r,s){a(function(){t(),n()});var l={Stage:{},View:{},Router:{}};l.View.SiteBody=e.View.extend({el:document.body,events:{"click a":"anchorClick"},initialize:function(){this.updateSiteMeta()},anchorClick:function(e){var t=e.currentTarget.href,n=function(e){var t=function(e){return e.replace("http://","").replace("https://","").split("/")[0]};return t(location.href)!==t(e)},a=function(e){var t=e.replace("http://","").replace("https://","").indexOf("/");return(e.replace("http://","").replace("https://","").substr(t)+"/").replace("//","/")};if(n(t));else{e.preventDefault();var i=a(t),o=$(e.currentTarget);o.hasClass("single-work__link")?this.workPageChange(o,i):this.pageChange(i)}},updateSiteMeta:function(){var e=$(".nav-links"),t=document.location.pathname;$("title").eq(0).text("Chris Amador </> Creative Front-End Developer"),e.find(".active").removeClass("active"),e.each(function(e,n){var a=$(n).find("a");a.each(function(e,n){0===t.indexOf(n.pathname+"/")?$(n).parent().addClass("active"):$(n).parent().addClass("non-active")})})},pageChange:function(t){e.history.navigate(t,{trigger:!0})},workPageChange:function(t,n){var a=this,i=this.$el,o=t.offset().top-$(window).scrollTop(),r=t.offset().left,l=$(window).width()-(r+t.outerWidth()),d=t.clone();d.css({position:"fixed",zIndex:9,left:r+"px",top:o+"px",right:l+"px"}).addClass("single-work__link--full-page"),i.append(d),d.animate({left:0,right:0,bottom:0,top:0},600,function(){s.add(),a.el.scrollTop=0,e.history.navigate(n,{trigger:!0})})},renderNewContent:function(e){var t=this;t.$el.find(".page--active").removeClass("page--active").addClass("page--old");var a=function(){r(document.getElementById("mobile-btn")).removeClass("is-active"),r(document.getElementById("side-nav")).removeClass("is-active"),t.$el.find("#header").after((new l.View.PageContent).render(e).el),setTimeout(function(){t.$el.find(".page--incoming").css("left","0%"),t.updateSiteMeta()},100),setTimeout(function(){t.$el.find(".page--incoming").addClass("page--active").removeClass("page--incoming"),t.el.scrollTop=0,t.$el.find(".page--old").remove(),t.$el.find(".single-work__link--full-page").remove(),setTimeout(function(){l.Stage.Trans=!1,n(),o(),s.remove()},100)},1100)};return a(),this}}),l.View.PageContent=e.View.extend({className:"page page--incoming",render:function(e){return this.$el.html(e),this}}),l.Router.Main=e.Router.extend({initialize:function(){},routes:{"":"home",":pageName/":"page","works/:workName/":"work"},loader:function(e){l.Stage.InitLoad?l.Stage.InitLoad=!1:(l.Stage.Trans=!0,i(e,function(e,t){e||l.Stage.SiteBody.renderNewContent(t)}))},home:function(){this.loader("")},page:function(e){this.loader(e+"/")},work:function(e){this.loader("works/"+e+"/")}}),_.extend(l.Stage,e.Events),l.Stage.InitLoad=!0,l.Stage.Trans=!1,l.Stage.SiteBody=new l.View.SiteBody,l.Stage.Router=new l.Router.Main,e.history.start({pushState:!0}),window.STAGE=l.Stage});