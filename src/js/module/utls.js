define(function () {

	var Utls = function(el){
		var UtlsFn = function(el){
			this.el = el;
		};

		/**
		 * Add a class to a dom element
		 *
		 * @param {string} className - Name of class
		 *
		 */

	 	UtlsFn.prototype.addClass = function(className){
	 		if(this.hasClass(className)){
	 			return;
	 		}

	 		this.el.className += ' ' + className;
	 		return this;
	 	}

	 	/**
	 	 * Remove class from a dom element
	 	 *
	 	 * @param {string} className - Name of class
	 	 *
	 	 */

	 	UtlsFn.prototype.removeClass = function(className){
	 		var regx = new RegExp(' ' + className,"g");
	 		this.el.className = this.el.className.replace(regx, '');
	 		return this;
	 	}

	 	/**
	 	 *
	 	 * Replace class with another
	 	 *
	 	 * @param {string} oldClass - class name that will be removed
	 	 * @param {string} newClass - class name that added
	 	 *
	 	 */

	 	UtlsFn.prototype.replaceClass = function(oldClass,newClass){
	 		var regx = new RegExp(oldClass,"g");
	 		this.el.className = this.el.className.replace(regx, newClass);
	 		return this;
	 	}

	 	/**
	 	 *
	 	 * Checks to see if element has a class
	 	 *
	 	 * @param {string} className - class name that will be checked
	 	 *
	 	 */

	 	UtlsFn.prototype.hasClass = function(className){
	 		var classList = this.el.className.split(' '),
	 			output = false;

	 		for(var i = 0; i < classList.length; i++ ){
	 			if(classList[i] === className) output = true;
	 		}

	 		return output;
	 	}

		/**
	 	 *
	 	 * Toggle class on an element
	 	 *
	 	 * @param {string} className - class name that will be toggled
	 	 *
	 	 */

	 	UtlsFn.prototype.toggleClass = function(className){
			if(this.hasClass(className)){
				this.removeClass(className);
			}else{
				this.addClass(className);
			}
			return this;
	 	}

	 	/**
	 	 *
	 	 * Check scrollTop of the element
	 	 *
	 	 * @param {number} amount - optional set the scroll top
	 	 *
	 	 */

	 	UtlsFn.prototype.scrollTop = function(amount){

	 		var propToUse;

	 		if(this.el.scrollY != undefined){
	 			propToUse = 'scrollY';
	 		}else if(this.el.scrollTop != undefined){
	 			propToUse = 'scrollTop';
	 		}

	 		if(amount != undefined){
 				this.el[propToUse] = amount;
 				return this;
	 		}else{
 				return this.el[propToUse];
	 		}

	 	}

	 	/**
	 	 *
	 	 * On events
	 	 *
	 	 * @param {string} event - event to listen to
	 	 * @param {function} cb - call back function
	 	 *
	 	 */

	 	UtlsFn.prototype.on = function(events,cb){
	 		var eventlist = events.split(' ');

	 		for(var i = 0; i < eventlist.length; i++ ){
	 			this.el.addEventListener(eventlist[i],cb);
	 		}

	 		return this;
	 	}

	 	/**
	 	 *
	 	 * Remove element
	 	 *
	 	 *
	 	 */

	 	UtlsFn.prototype.remove = function(){
	 		this.el.remove();
	 		return this;
	 	}

	 	/**
	 	 *
	 	 * On events
	 	 *
	 	 * @param {string} event - event to listen to
	 	 * @param {function} cb - call back function
	 	 *
	 	 */

	 	UtlsFn.prototype.on = function(events,cb){
	 		var eventlist = events.split(' ');

	 		for(var i = 0; i < eventlist.length; i++ ){
	 			this.el.addEventListener(eventlist[i],cb);
	 		}

	 		return this;
	 	}


	 	/**
	 	 *
	 	 * Animate css styles
	 	 *
	 	 * @param {object} styles - styles to animate to
	 	 * @param {number} duration - duration for animation in ms
	 	 * @param {function} cb - call back function
	 	 *
	 	 */

	 	UtlsFn.prototype.animate = function(styles,duration,cb){

	 		var animate = function(){

	 		}

	 		requestAnimationFrame(animate);

	 		return this;
	 	}

	 	/**
	 	 *
	 	 * Animate scroll top
	 	 *
	 	 * @param {number} position - position to animate to
	 	 * @param {function} cb - call back function
	 	 *
	 	 */

	 	UtlsFn.prototype.animateScrollTop = function(position,cb){
	 		var self = this,
	 			propToUse;

	 		if(this.el.scrollY != undefined){
	 			propToUse = 'scrollY';
	 		}else if(this.el.scrollTop != undefined){
	 			propToUse = 'scrollTop';
	 		}

	 		var direction = (position - self.el[propToUse]) < 0 ? -60 : 60;

	 		var animate = function(){
	 			var end = ( direction > 0 ) ? Math.max(self.el[propToUse], position) : Math.min(self.el[propToUse], position);

	 			if (self.el[propToUse] == end){
	 				// Done
	 				if(cb) cb();
	 				return self;
	 			}else{
	 				self.el[propToUse] += direction;
					requestAnimationFrame(animate);
	 			}
	 		}

	 		requestAnimationFrame(animate);
	 	}

	 	/**
	 	 *
	 	 * Return offset data object
	 	 *
	 	 */

	 	UtlsFn.prototype.getBoundingClientRect = function(){
	 		return this.el.getBoundingClientRect();

	 	}

	 	/**
	 	 *
	 	 * Set css styles on the element
	 	 *
	 	 * @param {string} styleName - position to animate to
	 	 * @param {string} styleSetting - call back function
	 	 */

	 	UtlsFn.prototype.css = function(styleName,styleSetting){
	 		this.el.style[styleName] = styleSetting;
	 		return this;
	 	}


	 	/** return new function */
		return new UtlsFn(el);
	}

	return Utls;

})
