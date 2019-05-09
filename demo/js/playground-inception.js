$(document).ready(function () {

  $('#DemoInception').on('click', function () {
    openInceptionModal();
  });

});

var inceptionLevel = 1;
var offsetLevel = 0;

function openInceptionModal() {
  if (offsetLevel > 5) {
    offsetLevel = 0;
  }

  new jBox('Modal', {
    width: 360,
    addClass: 'inception-modal',
    overlayClass: 'inception-overlay',
    zIndex: 'auto',
    draggable: 'title',
    closeOnClick: false,
    closeButton: 'title',
    title: 'Inception level ' + inceptionLevel++,
    offset: {
      x: offsetLevel * 15,
      y: offsetLevel * 15
    },
    content: (
      '<p>You can open new modal windows within this modal window.</p>' +
      '<p><button class="inception-modal-button" data-inception-tooltip="Open a new inception modal window">Open new modal window</button></p>'
    ),
    onCreated: function () {
      // Add tooltip
      this.tooltip = new jBox('Tooltip', {
        theme: 'TooltipBorder',
        attach: '[data-inception-tooltip]',
        getContent: 'data-inception-tooltip',
        zIndex: 'auto',
        delayOpen: 600
      });

      // Add button event
      this.content.find('.inception-modal-button').on('click', function () {
        openInceptionModal();
      });
    },
    // Remove modal from DOM when it's closed
    onCloseComplete: function () {
      this.destroy();
      this.tooltip && this.tooltip.destroy();
    }
  }).open();

  offsetLevel++;
}
