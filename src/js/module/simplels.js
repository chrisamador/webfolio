define(['jquery'],function ($) {

  var html = ['<div id="simple-loading-screen" class="simple-loading-screen">',
  '	<div class="simple-loading-screen__inner">',
  '		<div class="simple-loading-screen-dots">',
  '			<div class="simple-dots">',
  '				<div class="simple-dot"></div>',
  '				<div class="simple-dot"></div>',
  '				<div class="simple-dot"></div>',
  '			</div>',
  '		</div>',
  '	</div>',
  '</div>'].join('');

  function add() {
    $('body').append(html);
    setTimeout(function () {
      $('#simple-loading-screen').addClass('is-active');
    },100);
  }

  function remove(){
    var $screen = $('#simple-loading-screen').removeClass('is-active');
    setTimeout(function () {
      $screen.remove();
    },550);
  }

  return {
    add: add,
    remove: remove
  }
})
