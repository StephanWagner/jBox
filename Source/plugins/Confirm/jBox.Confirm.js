/**
 * jBox Confirm plugin: Add a confirm dialog to links, buttons, etc.
 *
 * Author: Stephan Wagner (https://stephanwagner.me)
 *
 * License: MIT (http://opensource.org/licenses/MIT)
 *
 * Requires: jBox 0.4.1 (https://code.jboxcdn.com/jBox.min.js)
 *           jQuery 3.1.1 (https://code.jquery.com/jquery-3.1.1.min.js)
 */

jQuery(document).ready(function () {
  
  new jBoxPlugin('Confirm', {
    
    
    // Options (https://stephanwagner.me/jBox/options#options-confirm)
    
    confirmButton: 'Submit',  // Text for the submit button
    cancelButton: 'Cancel',   // Text for the cancel button
    confirm: null,            // Function to execute when clicking the submit button. By default jBox will use the onclick or the href attribute in that order if found
    cancel: null,             // Function to execute when clicking the cancel button
    closeOnConfirm: true,     // Close jBox when the user clicks the confirm button
    target: jQuery(window),
    addClass: 'jBox-Modal',
    fixed: true,
    attach: jQuery('[data-confirm]'),
    getContent: 'data-confirm',
    content: 'Do you really want to do this?',
    minWidth: 360,
    maxWidth: 500,
    blockScroll: true,
    closeOnEsc: true,
    closeOnClick: false,
    closeButton: false,
    overlay: true,
    animation: 'zoomIn',
    preventDefault: true,
    
    
    // Triggered when jBox is attached to the element
    
    _onAttach: function (el)
    {
      // Extract the href or the onclick event if no submit event is passed
      if (!this.options.confirm) {
        var submit = el.attr('onclick') ? el.attr('onclick') : (el.attr('href') ? (el.attr('target') ? 'window.open("' + el.attr('href') + '", "' + el.attr('target') + '");'  : 'window.location.href = "' + el.attr('href') + '";') : '');
        el.prop('onclick', null).data('jBox-Confirm-submit', submit);
      }
    },
    
    
    // Triggered when jBox was created
    
    _onCreated: function ()
    {
      // Add a footer to the jBox container
      this.footer = jQuery('<div class="jBox-Confirm-footer"/>');
      jQuery('<div class="jBox-Confirm-button jBox-Confirm-button-cancel"/>').html(this.options.cancelButton).click(function () { this.options.cancel && this.options.cancel(); this.close(); }.bind(this)).appendTo(this.footer);
      this.submitButton = jQuery('<div class="jBox-Confirm-button jBox-Confirm-button-submit"/>').html(this.options.confirmButton).appendTo(this.footer);
      this.footer.appendTo(this.container);
    },
    
    
    // Triggered when jBox is opened
    
    _onOpen: function ()
    {
      // Set the new action for the submit button
      this.submitButton.off('click.jBox-Confirm' + this.id).on('click.jBox-Confirm' + this.id, function () { this.options.confirm ? this.options.confirm() : eval(this.source.data('jBox-Confirm-submit')); this.options.closeOnConfirm && this.close(); }.bind(this));
    }
    
  });
  
});