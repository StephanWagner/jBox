/**
 * jBox Notice plugin: Opens a popup notice
 *
 * Author: Stephan Wagner <stephanwagner.me@gmail.com> (https://stephanwagner.me)
 *
 * License: MIT (https://opensource.org/licenses/MIT)
 *
 * Requires: jBox (https://cdn.jsdelivr.net/gh/StephanWagner/jBox@latest/dist/jBox.min.js)
 */

function jBoxNoticeWrapper(jBox, jQuery) {

  new jBox.plugin('Notice', {


    // Options (https://stephanwagner.me/jBox/options#options-notice)

    color: null,      // Add a color to your notices, use 'gray' (default), 'black', 'red', 'green', 'blue' or 'yellow'
    stack: true,      // Set to false to disable notice-stacking
    stackSpacing: 10, // Spacing between notices when they stack
    autoClose: 6000,  // Time in ms after which the notice will disappear
    attributes: {     // Defines where the notice will pop up
      x: 'right',     // 'left' or 'right'
      y: 'top'        // 'top' or 'bottom'
    },
    position: {       // Defines the distance to the viewport boundary
      x: 15,
      y: 15
    },
    responsivePositions: {  // Responsive positions
      500: {                // The key defines the maximum width of the viewport, the values will replace the default position options
        x: 5,               // Start with the lowest viewport
        y: 5
      },
      768: {
        x: 10,
        y: 10
      }
    },
    target: window,
    fixed: true,
    animation: 'zoomIn',
    closeOnClick: 'box',
    zIndex: 12000,


    // Triggered when notice is initialized

    _onInit: function ()
    {
      // Cache position values
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

        // Set new padding options
        this.options.adjustDistance = {
          top: this.options.position.y,
          right: this.options.position.x,
          bottom: this.options.position.y,
          left: this.options.position.x
        };
      };

      // If jBox grabs an element as content, crab a clone instead
      this.options.content instanceof jQuery && (this.options.content = this.options.content.clone().attr('id', ''));

      // Adjust paddings when window resizes
      jQuery(window).on('resize.responsivejBoxNotice-' + this.id, function (ev) { if (this.isOpen) { this._adjustNoticePositon(); } }.bind(this));

      this.open();
    },


    // Triggered when notice was created

    _onCreated: function ()
    {
      // Add color class
      this.wrapper.addClass('jBox-Notice-color jBox-Notice-' + (this.options.color || 'gray'));

      // Store position in jBox wrapper
      this.wrapper.data('jBox-Notice-position', this.options.attributes.x + '-' + this.options.attributes.y);
    },


    // Triggered when notice opens

    _onOpen: function ()
    {
      // Bail if we're stacking
      if (this.options.stack) {
          return;
      }

      // Adjust position when opening
      this._adjustNoticePositon();

      // Loop through notices at same window corner destroy them
      jQuery.each(jQuery('.jBox-Notice'), function (index, el)
      {
        el = jQuery(el);

        // Abort if the element is this notice or when it's not at the same position
        if (el.attr('id') == this.id || el.data('jBox-Notice-position') != this.options.attributes.x + '-' + this.options.attributes.y) {
          return;
        }

        // Remove notice when we don't wont to stack them
        if (!this.options.stack) {
          el.data('jBox').close({ignoreDelay: true});
          return;
        }
      }.bind(this));
    },

    // Triggered when resizing window etc.

    _onPosition: function ()
    {
        var stacks = {};
        jQuery.each(jQuery('.jBox-Notice'), function (index, el)
        {
          el = jQuery(el);
          var pos = el.data('jBox-Notice-position');
          if (!stacks[pos]) {
              stacks[pos] = [];
          }
          stacks[pos].push(el);
        });
        for (var pos in stacks) {
            var position = pos.split('-');
            var direction = position[1];
            stacks[pos].reverse();
            var margin = 0;
            for (var i in stacks[pos]) {
                el = stacks[pos][i];
                el.css('margin-' + direction, margin);
                margin += el.outerHeight() + this.options.stackSpacing;
            }
        }
    },

    // Remove notice from DOM and reposition other notices when closing finishes

    _onCloseComplete: function ()
    {
        this.destroy();
        this.options._onPosition.bind(this).call();
    }

  });

};

//# sourceMappingURL=jBox.Notice.js.map
