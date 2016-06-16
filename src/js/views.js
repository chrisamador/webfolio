//

define(['backbone'], function (backbone) {
	var views = {}

	views.home = backbone.View.extend({
		tagName: 'ul'
	});

	return views;
})