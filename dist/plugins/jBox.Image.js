/**
 * jBox Image plugin: Adds a lightbox to your images
 *
 * Author: Stephan Wagner <stephanwagner.me@gmail.com> (https://stephanwagner.me)
 *
 * License: MIT (https://opensource.org/licenses/MIT)
 *
 * Requires: jBox (https://cdn.jsdelivr.net/gh/StephanWagner/jBox@latest/dist/jBox.min.js)
 */

function jBoxImageWrapper(jBox, jQuery) {

  new jBox.plugin('Image', {


    // Options (https://stephanwagner.me/jBox/options#options-image)

    src: 'href',                 // The attribute where jBox gets the image source from, e.g. href="/path_to_image/image.jpg"
    gallery: 'data-jbox-image',  // The attribute to set the galleries, e.g. data-jbox-image="gallery1"
    imageLabel: 'title',         // The attribute where jBox gets the image label from, e.g. title="My label"
    imageFade: 360,              // The fade duration for images in ms
    imageSize: 'contain',        // How to display the images. Use CSS background-position values, e.g. 'cover', 'contain', 'auto', 'initial', '50% 50%'
    imageCounter: false,         // Set to true to add an image counter, e.g. 4/20
    imageCounterSeparator: '/',  // HTML to separate the current image number from all image numbers, e.g. '/' or ' of '
    downloadButton: false,       // Adds a download button
    downloadButtonText: null,    // Text for the download button
    downloadButtonUrl: null,     // The attribute at the source element where to find the image to download, e.g. data-download="/path_to_image/image.jpg". If none provided, the currently active image will be downloaded
    mobileImageAttr: null,       // The attribute to look for an mobile version of the image
    mobileImageBreakpoint: null, // The upper breakpoint to load the mobile image
    preloadFirstImage: false,    // Preload the first image when page is loaded
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

      this.initImage = function (item) {
        item = jQuery(item);

        // Abort if the item was added to a gallery already
        if (item.data('jBox-image-gallery')) return;

        // Get the image src
        var src = item.attr(this.options.src);

        // Update responsive image src
        if (this.options.mobileImageAttr && this.options.mobileImageBreakpoint && item.attr(this.options.mobileImageAttr)) {
          if (jQuery(window).width() <= this.options.mobileImageBreakpoint) {
            src = item.attr(this.options.mobileImageAttr);
          }
        }

        // Add item to a gallery
        var gallery = item.attr(this.options.gallery) || 'default';
        !this.images[gallery] && (this.images[gallery] = []);
        this.images[gallery].push({
          src: src,
          label: (item.attr(this.options.imageLabel) || ''),
          downloadUrl: this.options.downloadButtonUrl && item.attr(this.options.downloadButtonUrl) ? item.attr(this.options.downloadButtonUrl) : null
        });

        // Remove the title attribute so it won't show the browsers tooltip
        this.options.imageLabel == 'title' && item.removeAttr('title');

        // Store data in source element for easy access
        item.data('jBox-image-gallery', gallery);
        item.data('jBox-image-id', (this.images[gallery].length - 1));
      }.bind(this);

      // Loop through images, sort and save in global variable
      this.attachedElements && this.attachedElements.length && jQuery.each(this.attachedElements, function (index, item) {
        this.initImage(item);
      }.bind(this));

      // Helper to inject the image into content area
      var appendImage = function (gallery, id, show, instant) {
        // Abort if image was appended already
        if (jQuery('#jBox-image-' + gallery + '-' + id).length) {
          return;
        }

        // Create image container
        var image = jQuery('<div/>', {
          id: 'jBox-image-' + gallery + '-' + id,
          'class': 'jBox-image-container' + (show ? ' jBox-image-' + gallery + '-current' : '')
        }).css({
          backgroundSize: this.options.imageSize,
          opacity: (instant ? 1 : 0),
          zIndex: (show ? this.imageZIndex++ : 0)
        }).appendTo(this.content);

        // Create labels
        jQuery('<div/>', {
          id: 'jBox-image-label-' + gallery + '-' + id,
          'class': 'jBox-image-label' + (show ? ' active' : '')
        }).html(this.images[gallery][id].label).click(function () { jQuery(this).toggleClass('expanded'); }).appendTo(this.imageLabel);

        // Show image
        show && image.animate({opacity: 1}, instant ? 0 : this.options.imageFade);

        return image;
      }.bind(this);

      // Function to download an image
      this.downloadImage = function (imageUrl) {
        var link = document.createElement('a');
        link.href = imageUrl;
        link.setAttribute('download', imageUrl.substring(imageUrl.lastIndexOf('/')+1));
        document.body.appendChild(link);
        link.click();
      };

      // Helper to show new image label
      var showLabel = function (gallery, id) {
        jQuery('.jBox-image-label.active').removeClass('active expanded');
        jQuery('#jBox-image-label-' + gallery + '-' + id).addClass('active');
      };

      // Helper to load image
      var loadImage = function (gallery, id, show, instant) {
        var imageContainer = appendImage(gallery, id, show, instant);
        imageContainer.addClass('jBox-image-loading');

        jQuery('<img src="' + this.images[gallery][id].src + '" />').each(function () {
          var tmpImg = new Image();
          tmpImg.onload = function () {
            imageContainer.removeClass('jBox-image-loading');
            imageContainer.css({backgroundImage: 'url("' + this.images[gallery][id].src + '")'});
          }.bind(this);

          tmpImg.onerror = function () {
            imageContainer.removeClass('jBox-image-loading');
            imageContainer.addClass('jBox-image-not-found');
          }.bind(this);

          tmpImg.src = this.images[gallery][id].src;
        }.bind(this));
      }.bind(this);

      // Show images when they are loaded or load them if not
      this.showImage = function (img) {
        // Get the gallery and the image id from the next or the previous image
        if (img != 'open') {
          var gallery = this.currentImage.gallery;
          var id = this.currentImage.id + (1 * (img == 'prev') ? -1 : 1);
          id = id > (this.images[gallery].length - 1) ? 0 : (id < 0 ? (this.images[gallery].length - 1) : id);

        // Or get image data from source element
        } else {
          // Get gallery and image id from source element
          if (this.source) {
            var gallery = this.source.data('jBox-image-gallery');
            var id = this.source.data('jBox-image-id');

          // Get gallery and image id attached elements
          } else if (this.attachedElements && this.attachedElements.length) {
            var gallery = jQuery(this.attachedElements[0]).data('jBox-image-gallery');
            var id = jQuery(this.attachedElements[0]).data('jBox-image-id');
          } else {
            return;
          }

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

        // Load image
        } else {
          loadImage(gallery, id, true, (img === 'open'));
        }

        // Show label
        showLabel(gallery, id);

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
        if (this.images[gallery].length - 1) {
	        var next_id = id + 1;
	        next_id = next_id > (this.images[gallery].length - 1) ? 0 : (next_id < 0 ? (this.images[gallery].length - 1) : next_id);

	        if (!jQuery('#jBox-image-' + gallery + '-' + next_id).length) {
            loadImage(gallery, next_id, false, false);
          }
	      }
      };

      // Preload image
      if (this.options.preloadFirstImage) {
        jQuery(window).on('load', function() {
          this.showImage('open');
        }.bind(this));
      }
    },


    // Triggered when jBox attaches a new element

    _onAttach: function (item) {
      this.initImage && this.initImage(item);
    },


    // Triggered when jBox was created

    _onCreated: function ()
    {
      // Append image label containers
      this.imageLabel = jQuery('<div/>', {'class': 'jBox-image-label-container'}).appendTo(this.wrapper);
      this.imageLabel.append(jQuery('<div/>', {'class': 'jBox-image-pointer-prev', click: function () { this.showImage('prev'); }.bind(this)})).append(jQuery('<div/>', {'class': 'jBox-image-pointer-next', click: function () { this.showImage('next'); }.bind(this)}));

      // Append the download button
      if (this.options.downloadButton) {
        this.downloadButton = jQuery('<div/>', {'class': 'jBox-image-download-button-wrapper'})
          .appendTo(this.wrapper)
          .append(
            this.options.downloadButtonText ? jQuery('<div/>', {'class': 'jBox-image-download-button-text'}).html(this.options.downloadButtonText) : null
          )
          .append(
            jQuery('<div/>', {'class': 'jBox-image-download-button-icon'})
          ).on('click touchdown', function () {
            if (this.images[this.currentImage.gallery][this.currentImage.id].downloadUrl) {
              var currentImageUrl = this.images[this.currentImage.gallery][this.currentImage.id].downloadUrl;
            } else {
              var currentImage = this.wrapper.find('.jBox-image-' + this.currentImage.gallery + '-current');
              var currentImageStyle = currentImage[0].style.backgroundImage;
              var currentImageUrl = currentImageStyle.slice(4, -1).replace(/["']/g, '');
            }
            this.downloadImage(currentImageUrl);
          }.bind(this));
      }

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

};

//# sourceMappingURL=jBox.Image.js.map
