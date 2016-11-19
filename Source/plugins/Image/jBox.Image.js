/*
---
description: jBox Image plugin: Adds an image lightbox to your images

authors: Stephan Wagner (http://stephanwagner.me)

license: MIT (http://opensource.org/licenses/MIT)

requires: jBox 0.4.0 (http://jboxcdn.com/jBox.min.js)
		  jQuery 3.1.1 (https://code.jquery.com/jquery-3.1.1.min.js)
...
*/
jQuery(document).ready(function () {
	
	new jBoxPlugin('Image', {
		
		// Options
		
		src: 'href',				// The attribute where jBox gets the image source from, e.g. href="/path_to_image/image.jpg"
		gallery: 'data-jbox-image',	// The attribute where you define the image gallery, e.g. data-jbox-image="gallery1"
		imageLabel: 'title',		// The attribute where jBox gets the image label from, e.g. title="My label"
		imageFade: 360,				// The fade duration for images
		imageSize: 'contain',		// How to display the images: Use CSS background-position values, e.g. 'cover', 'contain', 'auto', 'initial', '50% 50%'
		
		attach: jQuery('[data-jbox-image]'),
		target: jQuery(window),
		fixed: true,
		blockScroll: true,
		closeOnEsc: true,
		closeOnClick: 'button',
		closeButton: true,
		overlay: true,
		animation: 'zoomIn',
		preventDefault: true,
		width: 10000,
		height: 10000,
		adjustDistance: {
			top: 5,
			right: 5,
			bottom: 40,
			top: 40
		},
		
		// Set up system methods
		_onInit: function() {
			this.images = this.currentImage = {};
			this.imageZIndex = 1;
			
			// Loop through images, sort and save in global variable
			this.attachedElements && jQuery.each(this.attachedElements, function (index, item) {
				item = jQuery(item);
				if (item.data('jBox-image-gallery')) return;
				var gallery = item.attr(this.options.gallery) || 'default';
				!this.images[gallery] && (this.images[gallery] = []);
				this.images[gallery].push({src: item.attr(this.options.src), label: (item.attr(this.options.imageLabel) || '')});
				
				// Remove the title attribute so it won't show the browsers tooltip
				this.options.imageLabel == 'title' && item.removeAttr('title');
				
				// Store data in source element for easy access
				item.data('jBox-image-gallery', gallery);
				item.data('jBox-image-id', (this.images[gallery].length - 1));
			}.bind(this));
			
			// Helper to inject the image into content area
			var appendImage = function(gallery, id, preload, open, error) {
				
				// Abort if image was appended already
				if (jQuery('#jBox-image-' + gallery + '-' + id).length) return;
				
				// Create image container
				var image = jQuery('<div/>', {
					id: 'jBox-image-' + gallery + '-' + id,
					'class': 'jBox-image-container' + (error ? ' jBox-image-not-found' : '')
				}).css({
					backgroundImage: error ? '' : 'url("' + this.images[gallery][id].src + '")',
					backgroundSize: this.options.imageSize,
					opacity: (open ? 1 : 0),
					zIndex: (preload ? 0 : this.imageZIndex++)
				}).appendTo(this.content);
				
				// Create labels
				var text = jQuery('<div/>', {
					id: 'jBox-image-label-' + gallery + '-' + id,
					'class': 'jBox-image-label' + (open ? ' active' : '')
				}).html(this.images[gallery][id].label).click(function() { $(this).toggleClass('expanded'); }).appendTo(this.imageLabel);
				
				!open && !preload && image.animate({opacity: 1}, this.options.imageFade);
			}.bind(this);
			
			// Helper to show new image label
			var showLabel = function(gallery, id) {
				jQuery('.jBox-image-label.active').removeClass('active expanded');
				jQuery('#jBox-image-label-' + gallery + '-' + id).addClass('active');
			};
			
			// Show images when they are loaded or load them if not
			this.showImage = function(img) {
				// Get the gallery and the image id from the next or the previous image
				if (img != 'open') {
					var gallery = this.currentImage.gallery;
					var id = this.currentImage.id + (1 * (img == 'prev') ? -1 : 1);
					id = id > (this.images[gallery].length - 1) ? 0 : (id < 0 ? (this.images[gallery].length - 1) : id);
					// Or get image data from source element
				} else {
					var gallery = this.source.data('jBox-image-gallery');
					var id = this.source.data('jBox-image-id');
					
					// Remove or show the next and prev buttons
					jQuery('.jBox-image-pointer-prev, .jBox-image-pointer-next').css({display: (this.images[gallery].length > 1 ? 'block' : 'none')});
				}
				
				// Set new current image
				this.currentImage = {gallery: gallery, id: id};
				
				// Show image if it already exists
				if (jQuery('#jBox-image-' + gallery + '-' + id).length) {
					jQuery('#jBox-image-' + gallery + '-' + id).css({zIndex: this.imageZIndex++, opacity: 0}).animate({opacity: 1}, (img == 'open') ? 0 : this.options.imageFade);
					showLabel(gallery, id);
					
				// Load image
				} else {
					this.wrapper.addClass('jBox-image-loading');
					
				    jQuery('<img src="' + this.images[gallery][id].src + '"/>').each(function() {
				        var tmpImg = new Image();
				        tmpImg.onload = function() {
					        appendImage(gallery, id, false);
							showLabel(gallery, id);
							this.wrapper.removeClass('jBox-image-loading');
					    }.bind(this);
				        tmpImg.onerror = function() {
					        appendImage(gallery, id, false, null, true);
							showLabel(gallery, id);
							this.wrapper.removeClass('jBox-image-loading');
					    }.bind(this);
					    tmpImg.src = this.images[gallery][id].src;
	    			}.bind(this));
				}
				
				// Preload next image
				var next_id = id + 1;
				next_id = next_id > (this.images[gallery].length - 1) ? 0 : (next_id < 0 ? (this.images[gallery].length - 1) : next_id);
				
				(!jQuery('#jBox-image-' + gallery + '-' + next_id).length) && jQuery('<img src="' + this.images[gallery][next_id].src + '"/>').each(function() {
			        var tmpImg = new Image();
			        tmpImg.onload = function() {
				        appendImage(gallery, next_id, true);
				    }.bind(this);
			        tmpImg.onerror = function() {
				        appendImage(gallery, next_id, true, null, true);
				    }.bind(this);
					tmpImg.src = this.images[gallery][next_id].src;
				}.bind(this));
			};
		},
		_onCreated: function() {
			this.imageLabel = jQuery('<div/>', {'class': 'jBox-image-label-container'}).appendTo(this.wrapper);
			this.imageLabel.append(jQuery('<div/>', {'class': 'jBox-image-pointer-prev', click: function() { this.showImage('prev'); }.bind(this)})).append(jQuery('<div/>', {'class': 'jBox-image-pointer-next', click: function() { this.showImage('next'); }.bind(this)}));
		},
		_onOpen: function() {
			// Add a class to body so you can control the appearance of the overlay, for images a darker one is better
			jQuery('body').addClass('jBox-image-open');
			
			// Add key events
			jQuery(document).on('keyup.jBox-Image-' + this.id, function(ev) {
				(ev.keyCode == 37) && this.showImage('prev');
				(ev.keyCode == 39) && this.showImage('next');
			}.bind(this));
			
			// Load the image from the attached element
			this.showImage('open');
		},
		_onClose: function() {
			jQuery('body').removeClass('jBox-image-open');
			
			// Remove key events
			jQuery(document).off('keyup.jBox-Image-' + this.id);
		},
		_onCloseComplete: function() {
			// Hide all images
			this.wrapper.find('.jBox-image-container').css('opacity', 0);
		}
	});
});