/**
 * jBox Image plugin: Adds a lightbox to your images
 *
 * Author: Stephan Wagner (https://stephanwagner.me)
 *
 * License: MIT (https://opensource.org/licenses/MIT)
 * 
 * Requires: jBox (https://code.jboxcdn.com/jBox.min.js)
 */
 
jQuery(document).ready(function () {
  
  new jBox.plugin('Image', {
    
    
    // Options (https://stephanwagner.me/jBox/options#options-confirm)
    
    src: 'href',                // The attribute where jBox gets the image source from, e.g. href="/path_to_image/image.jpg"
    gallery: 'data-jbox-image', // The attribute to set the galleries, e.g. data-jbox-image="gallery1"
    imageLabel: 'title',        // The attribute where jBox gets the image label from, e.g. title="My label"
    imageFade: 360,             // The fade duration for images in ms
    imageSize: 'contain',       // How to display the images. Use CSS background-position values, e.g. 'cover', 'contain', 'auto', 'initial', '50% 50%'
    imageCounter: false,        // Set to true to add an image counter, e.g. 4/20
    imageCounterSeparator: '/', // HTML to separate the current image number from all image numbers, e.g. '/' or ' of '
    target: window,
    attach: '[data-jbox-image]',
    fixed: true,
    blockScroll: true,
    closeOnEsc: true,
    closeOnClick: 'button',
    closeButton: true,
    overlay: true,
    animation: 'zoomIn',
    preventDefault: true,
    width: '100%',
    height: '100%',
    adjustDistance: {
      top: 40,
      right: 5,
      bottom: 40,
      left: 5
    },
    
    
    // Triggered when jBox is initialized
    
    _onInit: function ()
    {
      // Initial images and z-index
      this.images = this.currentImage = {};
      this.imageZIndex = 1;
      
      // Loop through images, sort and save in global variable
      this.attachedElements && jQuery.each(this.attachedElements, function (index, item)
      {
        item = jQuery(item);
        
        // Abort if the item was added to a gallery already
        if (item.data('jBox-image-gallery')) return;
        
        // Add item to a gallery
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
      var appendImage = function (gallery, id, preload, open, error)
      {
        // Abort if image was appended already
        if (jQuery('#jBox-image-' + gallery + '-' + id).length) return;
        
        // Create image container
        var image = jQuery('<div/>', {
          id: 'jBox-image-' + gallery + '-' + id,
          'class': 'jBox-image-container' + (error ? ' jBox-image-not-found' : '') + (!open && !preload ? ' jBox-image-' + gallery + '-current' : '')
        }).css({
          backgroundImage: error ? '' : 'url("' + this.images[gallery][id].src + '")',
          backgroundSize: this.options.imageSize,
          opacity: (open ? 1 : 0),
          zIndex: (preload ? 0 : this.imageZIndex++)
        }).appendTo(this.content);
        
        // Create labels
        jQuery('<div/>', {
          id: 'jBox-image-label-' + gallery + '-' + id,
          'class': 'jBox-image-label' + (open ? ' active' : '')
        }).html(this.images[gallery][id].label).click(function () { $(this).toggleClass('expanded'); }).appendTo(this.imageLabel);
        
        // Show image
        !open && !preload && image.animate({opacity: 1}, this.options.imageFade);
        
      }.bind(this);
      
      // Helper to show new image label
      var showLabel = function (gallery, id)
      {
        jQuery('.jBox-image-label.active').removeClass('active expanded');
        jQuery('#jBox-image-label-' + gallery + '-' + id).addClass('active');
      };
      
      // Show images when they are loaded or load them if not
      this.showImage = function (img)
      {
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
        
        // If there is a current image already shown, hide it
        if (jQuery('.jBox-image-' + gallery + '-current').length) {
          jQuery('.jBox-image-' + gallery + '-current').removeClass('jBox-image-' + gallery + '-current').animate({opacity: 0}, (img == 'open') ? 0 : this.options.imageFade);
        }
        
        // Set new current image
        this.currentImage = {gallery: gallery, id: id};
        
        // Show image if it already exists
        if (jQuery('#jBox-image-' + gallery + '-' + id).length) {
          jQuery('#jBox-image-' + gallery + '-' + id).addClass('jBox-image-' + gallery + '-current').css({zIndex: this.imageZIndex++, opacity: 0}).animate({opacity: 1}, (img == 'open') ? 0 : this.options.imageFade);
          showLabel(gallery, id);
          
        // Load image
        } else {
          this.wrapper.addClass('jBox-image-loading');
          
          jQuery('<img src="' + this.images[gallery][id].src + '"/>').each(function ()
          {
            var tmpImg = new Image();
            tmpImg.onload = function ()
            {
              appendImage(gallery, id, false);
              showLabel(gallery, id);
              this.wrapper.removeClass('jBox-image-loading');
            }.bind(this);
            
            tmpImg.onerror = function () {
              appendImage(gallery, id, false, null, true);
              showLabel(gallery, id);
              this.wrapper.removeClass('jBox-image-loading');
            }.bind(this);
            
            tmpImg.src = this.images[gallery][id].src;
          }.bind(this));
        }
        
        // Update the image counter numbers
        if (this.imageCounter) {
          if (this.images[gallery].length > 1) {
            this.wrapper.addClass('jBox-image-has-counter');
            this.imageCounter.find('.jBox-image-counter-all').html(this.images[gallery].length);
            this.imageCounter.find('.jBox-image-counter-current').html(id + 1);
          } else {
            this.wrapper.removeClass('jBox-image-has-counter');
          }
        }
        
        // Preload next image
        var next_id = id + 1;
        next_id = next_id > (this.images[gallery].length - 1) ? 0 : (next_id < 0 ? (this.images[gallery].length - 1) : next_id);
        
        (!jQuery('#jBox-image-' + gallery + '-' + next_id).length) && jQuery('<img src="' + this.images[gallery][next_id].src + '"/>').each(function ()
        {
          var tmpImg = new Image();
          tmpImg.onload = function ()
          {
              appendImage(gallery, next_id, true);
          }.bind(this);
          
          tmpImg.onerror = function ()
          {
            appendImage(gallery, next_id, true, null, true);
          }.bind(this);
          
          tmpImg.src = this.images[gallery][next_id].src;
        }.bind(this));
      };
    },
    
    
    // Triggered when jBox was created
    
    _onCreated: function ()
    {
      // Append image label containers
      this.imageLabel = jQuery('<div/>', {'class': 'jBox-image-label-container'}).appendTo(this.wrapper);
      this.imageLabel.append(jQuery('<div/>', {'class': 'jBox-image-pointer-prev', click: function () { this.showImage('prev'); }.bind(this)})).append(jQuery('<div/>', {'class': 'jBox-image-pointer-next', click: function () { this.showImage('next'); }.bind(this)}));
      
      // Creating the image counter containers
      if (this.options.imageCounter) {
        this.imageCounter = jQuery('<div/>', {'class': 'jBox-image-counter-container'}).appendTo(this.wrapper);
        this.imageCounter.append(jQuery('<span/>', {'class': 'jBox-image-counter-current'})).append(jQuery('<span/>').html(this.options.imageCounterSeparator)).append(jQuery('<span/>', {'class': 'jBox-image-counter-all'}));
      }
    },
    
    
    // Triggered when jBox opens
    
    _onOpen: function ()
    {
      // Add key events
      jQuery(document).on('keyup.jBox-Image-' + this.id, function (ev) {
        (ev.keyCode == 37) && this.showImage('prev');
        (ev.keyCode == 39) && this.showImage('next');
      }.bind(this));
      
      // Load the image from the attached element
      this.showImage('open');
    },
    
    
    // Triggered when jBox closes
    
    _onClose: function ()
    {
      // Remove key events
      jQuery(document).off('keyup.jBox-Image-' + this.id);
    },
    
    
    // Triggered when jBox finished closing
    
    _onCloseComplete: function ()
    {
      // Hide all image containers
      this.wrapper.find('.jBox-image-container').css('opacity', 0);
    }
    
  });
  
});