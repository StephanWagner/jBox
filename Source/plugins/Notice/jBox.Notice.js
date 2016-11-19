/*
---
description: jBox Notice plugin: Opens a popup notice

authors: Stephan Wagner (http://stephanwagner.me)

license: MIT (http://opensource.org/licenses/MIT)

requires: jBox 0.4.0 (http://jboxcdn.com/jBox.min.js)
		  jQuery 3.1.1 (https://code.jquery.com/jquery-3.1.1.min.js)
...
*/

jQuery(document).ready(function () {
	
	new jBoxPlugin('Notice', {
		
		// Options
		
		color: null,			// Add a color to your notices, use 'gray' (default), 'black', 'red', 'green', 'blue' or 'yellow'
		stack: true,			// Set to false to disable notice-stacking
		autoClose: 6000,		// Time in ms after which the notice will disappear
		attributes: {			// Defines where the notice will pop up
			x: 'right',			// 'left' or 'right'
			y: 'top'			// 'top' or 'bottom'
		},
		position: {				// Defines the distance to the viewport boundary
			x: 15,
			y: 15
		},
		responsivePositions: {	// Responsive positions
			500: {				// The key defines the maximum width of the viewport, the values will replace the default position options
				x: 5,			// Start with the lowest viewport
				y: 5
			},
			768: {
				x: 10,
				y: 10
			}
		},
		target: jQuery(window),
		fixed: true,
		animation: 'zoomIn',
		closeOnClick: 'box',
		zIndex: 12000,
		
		// Set up system methods
		_onInit: function () {
			
			// Cache position
			this.defaultNoticePosition = jQuery.extend({}, this.options.position);
			
			// Type Notice has its own adjust position function
			this._adjustNoticePositon = function () {
				var win = jQuery(window);
				var windowDimensions = {
					x: win.width(),
					y: win.height()
				};
				
				// Reset default position
				this.options.position = jQuery.extend({}, this.defaultNoticePosition);
				
				// Adjust depending on viewport
				jQuery.each(this.options.responsivePositions, function (viewport, position) {
					if (windowDimensions.x <= viewport) {
						this.options.position = position;
						return false;
					}
				}.bind(this));
				
				// Set new distances to viewport
				this.options.adjustDistance = {
					top: this.options.position.y,
					right: this.options.position.x,
					bottom: this.options.position.y,
					left: this.options.position.x
				};
			};
			
			jQuery(window).on('resize.responsivejBoxNotice-' + this.id, function(ev) { if (this.isOpen) { this._adjustNoticePositon(); } }.bind(this));
			
			this.open();
		},
		_onCreated: function() {
			this.wrapper.addClass('jBox-Notice-color jBox-Notice-' + (this.options.color || 'gray'));
			this.wrapper.data('jBox-Notice-position', this.options.attributes.x + '-' + this.options.attributes.y);
		},
		_onOpen: function() {
			// Adjust position when opening
			this._adjustNoticePositon();
			
			// Loop through notices at same window corner and either move or destroy them
			jQuery.each(jQuery('.jBox-Notice'), function(index, el) {
				el = jQuery(el);
				
				if (el.attr('id') == this.id || el.data('jBox-Notice-position') != this.options.attributes.x + '-' + this.options.attributes.y) return;
				if (!this.options.stack) {
					el.data('jBox').close({ignoreDelay: true});
					return;
				}
				var margin = (el.data('jBoxNoticeMargin') ? parseInt(el.data('jBoxNoticeMargin')) : parseInt(el.css('margin-' + this.options.attributes.y))) + this.wrapper.outerHeight() + (jQuery(window).width() > 500 ? 10 : 5);
				el.data('jBoxNoticeMargin', margin);
				el.css('margin-' + this.options.attributes.y, margin);
			}.bind(this));
		},
		
		// Remove notice from DOM when closing finishes
		_onCloseComplete: function() {
			this.destroy();
		}
	});
});