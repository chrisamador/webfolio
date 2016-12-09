define(function () {

	var pageloadingScreen = function(){

		var self = this;
		self.loadScreen = document.getElementById( 'loading-screen' );
		self.duration = 1000; //

		self.closeScreen = function(){

			// replace hidden with open
			self.loadScreen.className = self.loadScreen.className.replace(/is-hidden/g, 'is-open');

			// replace open with close
			setTimeout(function(){
				self.loadScreen.className = self.loadScreen.className.replace(/is-open/g, 'is-closed');
			},100)

		}
		self.openScreen = function(cb, duration){
			var d = duration || self.duration;

			// replace close with open
			self.loadScreen.className = self.loadScreen.className.replace(/is-closed/g, 'is-open');
			self.loadScreen.style.transitionDuration = self.duration + 'ms';

			// Removes the element from the dom
			setTimeout(function(){
				self.loadScreen.className = self.loadScreen.className.replace(/is-open/g, 'is-hidden');
				self.loadScreen.remove();
			}, d)

			// Runs callback
			setTimeout(function(){
				cb();
			}, d - 500);

		}
		self.addScreen = function(){
			var html = '<div id="loading-screen" class="loading-screen__block is-hidden"><div class="loading-screen__inner"><div class="loading-screen__logo"><svg width="146px" height="146px" viewBox="0 0 176 176" xmlns="http://www.w3.org/2000/svg"><title>Chris Amador Logo</title><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M87.7303853,45.009118 C89.719211,47.9397596 93.5015138,43.9150118 92.1272018,40.9071966 C90.7528899,37.8857051 84.4752294,40.1325304 87.7146789,45.0169331 L87.7303853,45.009118 Z M123.455624,110.676005 C129.295468,112.239014 129.226752,104.386848 124.828954,104.933901 C120.433119,105.485838 120.40367,109.881801 123.446789,110.663305 L123.455624,110.676005 Z M141.590651,57.6225995 C139.942459,39.2533379 124.665018,29.7297295 115.495413,39.84142 C103.376927,53.1924463 107.526367,86.0634996 89.1145138,95.3282346 C70.7036422,104.625207 50.0938716,93.4135488 50.0938716,76.4578332 C50.0938716,59.5021177 63.0104404,51.5718015 67.1323945,50.2051456 C71.2543486,48.836536 77.904055,48.5268648 79.2214312,46.3757739 C80.5388073,44.2246829 80.8706055,37.8974277 66.5816881,38.9915339 C59.7866972,39.5112343 45.1129725,46.4597856 38.8264771,59.229568 C31.8891468,73.3191161 34.2274404,93.8111392 47.366844,103.775321 C71.3250275,122.140675 93.5044587,110.613484 101.775853,101.588085 C110.019761,92.5636627 114.140734,79.4353651 122.659505,81.0765244 C131.179257,82.7372214 124.328312,93.6782834 127.862257,95.3389803 C131.42467,96.9869778 143.276147,75.9840462 141.607339,57.618692 L141.590651,57.6225995 Z M122.946147,74.4063841 C114.510817,77.3370257 123.322119,53.9133841 127.992817,59.7189852 C132.664495,65.5314244 127.86422,72.6626523 122.955963,74.4210373 L122.946147,74.4063841 Z" id="main-logo" fill="white"></path><path d="M50.0773907,141 L50.0773907,130.512336 L53.3043644,130.512336 C54.2263615,130.512336 55.0511044,130.720022 55.7786177,131.135401 C56.506131,131.55078 57.0739671,132.141425 57.4821429,132.907355 C57.8903187,133.673285 58.0944035,134.543647 58.0944035,135.518467 L58.0944035,136.001072 C58.0944035,136.975892 57.8939201,137.842652 57.4929475,138.601379 C57.0919748,139.360106 56.5265397,139.94835 55.7966254,140.36613 C55.066711,140.78391 54.2431686,140.995198 53.3259736,141 L50.0773907,141 Z M52.2383106,132.262681 L52.2383106,139.264061 L53.2827552,139.264061 C54.1279192,139.264061 54.7737877,138.987946 55.2203801,138.435708 C55.6669724,137.883471 55.8950672,137.093542 55.9046713,136.0659 L55.9046713,135.511264 C55.9046713,134.445204 55.6837795,133.637269 55.2419893,133.087432 C54.800199,132.537595 54.1543305,132.262681 53.3043644,132.262681 L52.2383106,132.262681 Z M70.974558,136.454865 L66.8255918,136.454865 L66.8255918,139.264061 L71.6948646,139.264061 L71.6948646,141 L64.6646719,141 L64.6646719,130.512336 L71.6804585,130.512336 L71.6804585,132.262681 L66.8255918,132.262681 L66.8255918,134.762145 L70.974558,134.762145 L70.974558,136.454865 Z M83.4009193,138.248429 C83.4009193,137.840253 83.2568594,137.526923 82.9687353,137.308429 C82.6806112,137.089934 82.1619956,136.859439 81.412873,136.616934 C80.6637504,136.37443 80.0707038,136.13553 79.6337156,135.900229 C78.4428027,135.256752 77.8473552,134.389992 77.8473552,133.299922 C77.8473552,132.733278 78.0070216,132.227868 78.3263591,131.783677 C78.6456966,131.339485 79.1042873,130.992541 79.7021448,130.742834 C80.3000023,130.493126 80.9710812,130.368274 81.7154018,130.368274 C82.4645244,130.368274 83.1320019,130.503931 83.7178542,130.775247 C84.3037065,131.046564 84.7586957,131.429523 85.0828353,131.924137 C85.4069749,132.41875 85.5690422,132.980583 85.5690422,133.609654 L83.4081224,133.609654 C83.4081224,133.129447 83.2568595,132.756092 82.9543292,132.489577 C82.6517989,132.223062 82.2268222,132.089807 81.6793865,132.089807 C81.151159,132.089807 80.7405883,132.201453 80.4476621,132.42475 C80.154736,132.648046 80.0082751,132.942168 80.0082751,133.307125 C80.0082751,133.648072 80.1799464,133.933791 80.5232943,134.16429 C80.8666422,134.394789 81.3720523,134.610879 82.0395398,134.812566 C83.2688692,135.182325 84.1644415,135.640916 84.7262835,136.188352 C85.2881255,136.735788 85.5690422,137.417671 85.5690422,138.234023 C85.5690422,139.141613 85.2256995,139.853509 84.5390038,140.369732 C83.852308,140.885954 82.9279237,141.144061 81.7658232,141.144061 C80.9590758,141.144061 80.2243704,140.9964 79.561685,140.701073 C78.8989996,140.405746 78.3935895,140.001177 78.0454395,139.487356 C77.6972896,138.973535 77.5232172,138.378087 77.5232172,137.700996 L79.6913402,137.700996 C79.6913402,138.858294 80.3828276,139.436935 81.7658232,139.436935 C82.2796445,139.436935 82.6806112,139.332491 82.9687353,139.123601 C83.2568594,138.914711 83.4009193,138.62299 83.4009193,138.248429 L83.4009193,138.248429 Z M94.3290428,141 L92.1681229,141 L92.1681229,130.512336 L94.3290428,130.512336 L94.3290428,141 Z M109.629428,139.674636 C109.24046,140.140436 108.690631,140.501787 107.979925,140.758697 C107.269219,141.015608 106.481692,141.144061 105.61732,141.144061 C104.709729,141.144061 103.913798,140.945979 103.229503,140.549808 C102.545208,140.153638 102.016989,139.578599 101.644829,138.824674 C101.272668,138.070749 101.081789,137.184781 101.072185,136.166743 L101.072185,135.453639 C101.072185,134.406788 101.248658,133.500411 101.60161,132.734481 C101.954562,131.968552 102.463574,131.382708 103.12866,130.976933 C103.793747,130.571159 104.572871,130.368274 105.466055,130.368274 C106.709791,130.368274 107.682195,130.664797 108.383297,131.257853 C109.084399,131.850908 109.499772,132.714067 109.629428,133.847355 L107.526132,133.847355 C107.430091,133.247097 107.217603,132.807714 106.888661,132.529194 C106.559719,132.250674 106.107131,132.111416 105.530883,132.111416 C104.796166,132.111416 104.236734,132.387531 103.852568,132.939769 C103.468403,133.492007 103.273922,134.313148 103.26912,135.403218 L103.26912,136.073103 C103.26912,137.172776 103.478007,138.003522 103.895787,138.565364 C104.313567,139.127206 104.925821,139.408122 105.732569,139.408122 C106.544118,139.408122 107.122759,139.23525 107.468508,138.889502 L107.468508,137.081532 L105.502071,137.081532 L105.502071,135.489654 L109.629428,135.489654 L109.629428,139.674636 Z M124.908203,141 L122.747283,141 L118.540693,134.099463 L118.540693,141 L116.379773,141 L116.379773,130.512336 L118.540693,130.512336 L122.754486,137.427279 L122.754486,130.512336 L124.908203,130.512336 L124.908203,141 Z" id="tag-line" fill="#AF5757"></path><circle id="circle1" stroke="white"  stroke-width="4" cx="88" cy="88" r="82"></circle><circle id="circle2" stroke="white"  stroke-width="8" cx="88" cy="88" r="82"></circle></g></svg></div></div></div>',
				newScreen = document.createElement('div');

				document.body.appendChild(newScreen);
				newScreen.outerHTML = html;

			self.loadScreen = document.getElementById('loading-screen');
		}
		self.then = function(cb){
			cb()

		}
	}

	var loadingScreen = new pageloadingScreen();

	return loadingScreen;

});