define(function () {

	/**
	 *
	 * @url
	 * @call back function
	 *
	 */

	return function(url,cb){
		// console.log("loaded: " + url);
		var request = new XMLHttpRequest(),
			 markup;
		// url example: works/
		request.open('GET', '/' + url , true)

		request.onload = function(){
			if (request.status >= 200 && request.status < 400) {
				// Success!

				var start = "<!-- ##Start## -->";
				var end = "<!-- ##End## -->";
				markup = request.responseText.substr(request.responseText.indexOf(start) + start.length);
				markup = markup.substr(0, markup.indexOf(end));

				// err, data
				cb(false,markup)
			} else {
				// We reached our target server, but it returned an error
				// err, data
				cb(true,markup)
			}

		}
		request.send();
	}
})