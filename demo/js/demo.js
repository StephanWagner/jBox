$(document).ready(function () {

  // Tooltip

  new jBox('Tooltip', {
    attach: '#Tooltip-1',
    content: 'This is a basic jBox tooltip'
  });

  new jBox('Tooltip', {
    attach: '#Tooltip-2',
    theme: 'TooltipBorderThick',
    width: 200,
    position: {
      x: 'left',
      y: 'center'
    },
    outside: 'x',
    pointer: 'top:15',
    content: 'You have many options to position and animate your jBoxes',
    animation: 'move'
  });

  new jBox('Tooltip', {
    attach: '#Tooltip-3',
    theme: 'TooltipDark',
    animation: 'zoomOut',
    content: 'Use themes to change appearance',
  });

  new jBox('Tooltip', {
    attach: '#Tooltip-4',
    width: 300,
    pointer: 'right:80',
    animation: 'move',
    delayOpen: 1000,
    delayClose: 2000,
    content: 'This tooltip waits 1 second to open and closes after 2 seconds',
    onOpen: function () {
      this.source.removeClass('active').html('Hover me');
    },
    onClose: function () {
      this.source.removeClass('active').html('Hover me');
    }
  });

  new jBox('Mouse', {
    attach: '#Tooltip-5',
    position: {
      x: 'right',
      y: 'bottom'
    },
    content: 'I will follow you!'
  });

  new jBox('Tooltip', {
    attach: '#Tooltip-6',
    width: 280,
    closeOnMouseleave: true,
    animation: 'zoomIn',
    content: 'I won\'t close when you move your mouse over me'
  });

  new jBox('Tooltip', {
    attach: '#Tooltip-7',
    target: '#Tooltip-1',
    theme: 'TooltipBorder',
    trigger: 'click',
    adjustTracker: true,
    closeOnClick: 'body',
    closeButton: 'box',
    animation: 'move',
    position: {
      x: 'left',
      y: 'top'
    },
    outside: 'y',
    pointer: 'left:20',
    offset: {
      x: 25
    },
    content: 'You can position your tooltips at any element.<br>Scroll up and down to see this tooltip flip position!',
    onOpen: function () {
      this.source.addClass('active').html('Now scroll');
    },
    onClose: function () {
      this.source.removeClass('active').html('Click me');
    }
  });

  new jBox('Tooltip', {
    attach: '#Tooltip-8',
    theme: 'TooltipBorder',
    trigger: 'click',
    width: 200,
    height: ($(window).height() - 160),
    adjustTracker: true,
    closeOnClick: 'body',
    closeOnEsc: true,
    animation: 'move',
    position: {
      x: 'right',
      y: 'center'
    },
    outside: 'x',
    content: 'Scroll up and down or resize your browser, I will adjust my position!<br><br>Press [ESC] or click anywhere to close.',
    onOpen: function () {
      this.source.addClass('active').html('Now scroll');
    },
    onClose: function () {
      this.source.removeClass('active').html('Click me');
    }
  });

  // Modal

  new jBox('Modal', {
    attach: '#Modal-1',
    height: 200,
    title: 'I\'m a basic jBox modal window',
    content: '<div style="line-height: 30px;">Try to scroll ...it\'s blocked.<br>Press [ESC] or click anywhere to close.</div>'
  });

  new jBox('Modal', {
    attach: '#Modal-2',
    width: 350,
    height: 200,
    blockScroll: false,
    animation: 'zoomIn',
    draggable: 'title',
    closeButton: true,
    content: 'You can move this modal window',
    title: 'Click here to drag me around',
    overlay: false,
    reposition: false,
    repositionOnOpen: false
  });

  new jBox('Modal', {
    attach: '#Modal-3',
    width: 450,
    height: 250,
    closeButton: 'title',
    animation: false,
    title: 'AJAX request',
    ajax: {
      url: 'https://reqres.in/api/users?delay=2',
      data: {
        id: '1982',
        name: 'Stephan Wagner'
      },
      method: 'post',
      reload: 'strict',
      setContent: false,
      beforeSend: function () {
        this.setContent('');
        this.setTitle('<div class="ajax-sending">Sending AJAX request...</div>');
      },
      complete: function () {
        this.setTitle('<div class="ajax-complete">AJAX request complete</div>');
      },
      success: function (response) {
        this.setContent('<div class="ajax-success">Response:<tt>' + JSON.stringify(response) + '</tt></div>');
      },
      error: function () {
        this.setContent('<div class="ajax-error">Oops, something went wrong</div>');
      }
    }
  });

  // Confirm

  new jBox('Confirm', {
    content: 'Do you really want to do this?',
    cancelButton: 'Nope',
    confirmButton: 'Sure do!'
  });

  // Notice

  $('#Notice-1').click(function () {
    new jBox('Notice', {
      content: 'Hello, I\'m a notice',
      color: 'black'
    });
  });

  $('#Notice-2').click(function () {
    new jBox('Notice', {
      animation: 'flip',
      color: getColor(),
      content: 'Oooh! They also come in colors',
      delayOnHover: true,
      showCountdown: true
    });
  });

  $('#Notice-3').click(function () {
    new jBox('Notice', {
      theme: 'NoticeFancy',
      attributes: {
        x: 'left',
        y: 'bottom'
      },
      color: getColor(),
      content: 'Hello, I\'m down here',
      audio: '../assets/audio/bling2',
      volume: 80,
      animation: {
        open: 'slide:bottom',
        close: 'slide:left'
      }
    });
  });

  $('#Notice-4').click(function () {
    new jBox('Notice', {
      attributes: {
        x: 'right',
        y: 'bottom'
      },
      stack: false,
      animation: {
        open: 'tada',
        close: 'zoomIn'
      },
      color: getColor(),
      title: 'Tadaaa! I\'m single',
      content: 'Open another notice, I won\'t stack'
    });
  });

  // Image

  new jBox('Image', {
    imageCounter: true,
    imageCounterSeparator: ' of '
  });

  // Additional JS for demo purposes

  $('#Tooltip-4').on('mouseenter mouseleave', function () {
    $('#Tooltip-4').addClass('active').html('Wait...');
  });

  $('.target-notice').on('click', function () {
    $(this).addClass('active').html('Click me again');
  }).on('mouseleave', function () {
    $(this).removeClass('active').html('Click me');
  });

  var colors = ['red', 'green', 'blue', 'yellow'];
  var index = 0;
  var getColor = function () {
    if (index >= colors.length) {
      index = 0;
    }
    return colors[index++];
  };

});
