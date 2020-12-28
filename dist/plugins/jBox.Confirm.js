/**
 * jBox Confirm plugin: Add a confirm dialog to links, buttons, etc.
 *
 * Author: Stephan Wagner <stephanwagner.me@gmail.com> (https://stephanwagner.me)
 *
 * License: MIT (https://opensource.org/licenses/MIT)
 *
 * Requires: jBox (https://cdn.jsdelivr.net/gh/StephanWagner/jBox@latest/dist/jBox.min.js)
 */

function jBoxConfirmWrapper(jBox, jQuery) {

  new jBox.plugin('Confirm', {


    // Options (https://stephanwagner.me/jBox/options#options-confirm)

    confirmButton: 'Submit',  // Text for the submit button
    cancelButton: 'Cancel',   // Text for the cancel button
    confirm: null,            // Function to execute when clicking the submit button. By default jBox will use the onclick or href attribute in that order if found
    cancel: null,             // Function to execute when clicking the cancel button
    closeOnConfirm: true,     // Close jBox when the user clicks the confirm button
    target: window,
    fixed: true,
    attach: '[data-confirm]',
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
        var submit = el.attr('onclick') ? el.attr('onclick') : (
          el.attr('href') ? (
            el.attr('target') ? 'window.open("' + el.attr('href') + '", "' + el.attr('target') + '");'  : 'window.location.href = "' + el.attr('href') + '";'
          ) : '');
        el.prop('onclick', null).data('jBox-Confirm-submit', submit);
      }
    },


    // Triggered when jBox was created

    _onCreated: function ()
    {
      // Add modal class to mimic jBox modal
      this.wrapper.addClass('jBox-Modal');

      // Add a footer to the jBox container
      this.footer = jQuery('<div class="jBox-Confirm-footer"/>');

      jQuery('<div class="jBox-Confirm-button jBox-Confirm-button-cancel"/>')
        .html(this.options.cancelButton)
        .on('click tap', function () {
          this.options.cancel && this.options.cancel(this.source);
          this.close();
        }.bind(this))
        .appendTo(this.footer);

      this.submitButton = jQuery('<div class="jBox-Confirm-button jBox-Confirm-button-submit"/>')
        .html(this.options.confirmButton)
        .appendTo(this.footer);

      this.footer.appendTo(this.container);
    },


    // Triggered when jBox is opened

    _onOpen: function ()
    {
      // Set the new action for the submit button
      this.submitButton
        .off('click.jBox-Confirm' + this.id + ' tap.jBox-Confirm' + this.id)
        .on('click.jBox-Confirm' + this.id + ' tap.jBox-Confirm' + this.id, function () {
          this.options.confirm ? this.options.confirm(this.source) : eval(this.source.data('jBox-Confirm-submit'));
          this.options.closeOnConfirm && this.close();
        }.bind(this));
    }

  });

};

//# sourceMappingURL=jBox.Confirm.js.map
