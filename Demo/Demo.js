
$(document).ready(function() {

/* Switch on unique zIndex behavior for jBoxes with overlay:true */

/* Tooltip */

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
  onOpen: function() {
    this.source.removeClass('active').html('Hover me');
  },
  onClose: function() {
    this.source.removeClass('active').html('Hover me');
  }
});


new jBox('Mouse', {
  attach: '#Tooltip-5',
  position: {x: 'right', y: 'bottom'},
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
  onOpen: function() {
    this.source.addClass('active').html('Now scroll');
  },
  onClose: function() {
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
  onOpen: function() {
    this.source.addClass('active').html('Now scroll');
  },
  onClose: function() {
    this.source.removeClass('active').html('Click me');
  }
});


/* Modal */


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
    beforeSend: function() {
      this.setContent('');
      this.setTitle('<div class="ajax-sending">Sending AJAX request...</div>');
    },
    complete: function() {
      this.setTitle('<div class="ajax-complete">AJAX request complete</div>');
    },
    success: function(response) {
      this.setContent('<div class="ajax-success">Response:<tt>' + JSON.stringify(response) + '</tt></div>');
    },
    error: function() {
      this.setContent('<div class="ajax-error">Oops, something went wrong</div>');
    }
  }
});

/* holdPosition option */

var holdPos = new jBox('Modal', {
  id: 'hold-position',
  createOnInit: true,
  attach: '#Modal-7',
  blockScroll: false,
  animation: 'zoomIn',
  closeOnClick: false,
  closeOnEsc: false,
  closeButton: true,
  draggable: 'title',
  title: 'Click on title to drag it around',
  content: $('#hold-pos-content > div.norm').clone(),
  overlay: false,
  reposition: false,
  repositionOnOpen: false,
  holdPosition: true 
});

// Handle wider/taller selection events
var ckWider = false, ckTaller = false;
$('#hold-position').on('click', 'input[type="checkbox"]', function() {
  var content, src = '#hold-pos-content > div';
  if ($(this).val() == 'wider') {
    ckWider = $(this).prop('checked');
  } else if ($(this).val() == 'taller') {
    ckTaller = $(this).prop('checked');
  }
  if (ckWider && ckTaller) {
    content = $(src + '.wider-taller');
  } else if (ckWider) {
    content = $(src + '.wider');
  } else if (ckTaller) {
    content = $(src + '.taller');
  } else {
    content = $(src + '.norm');
  }
  $('hold-position jBox-content').empty(); // there are event handlers
  holdPos.setContent(content.clone());
});

new jBox('Modal', {
  id: 'stackedModal-1',
  attach: '#Modal-5',
  height: 200,
  zIndex: 'auto',
  draggable: 'title',
  createOnInit: true,
  closeOnEsc: false,
  closeOnClick: false,
  closeButton: 'title',
  title: 'I\'m a jBox true modal window',
  content: '<div>A true modal window blocks access to<br>'
    + 'everything on the page, including other<br>'
    + 'jBoxes, even if they are also true modals.'
    + '<p><button id="stack-modal">Open Another True Modal</button>'
    + '<p>(You can drag this window by its title.)'
});


new jBox('Modal', {
  attach: '#Modal-6',
  width: 350,
  height: 200,
  blockScroll: false,
  animation: 'zoomIn',
  draggable: 'title',
  closeButton: true,
  closeOnEsc: false,
  closeOnClick: false,
  overlay: false,
  reposition: false,
  createOnInit: true,
  repositionOnOpen: false,
  title: 'I\'m a non-modal window',
  content: '(You can drag this window by its title.)'
    + '<p><button id="open-nonmodal">Open/Close Another non-Modal</button>'
});


/* Stacked Modal */

new jBox('Modal', {
  id: 'stackedModal-2',
  attach: '#stack-modal',
  height: 200,
  zIndex: 'auto',
  offset: {x: 150, y: 70},
  draggable: 'title',
  closeOnClick: false,
  closeOnEsc: false,
  closeButton: 'title',
  title: 'I\'m a second jBox true modal window',
  content: 'A true modal blocks access to all underlying<br>'
    + 'elements on the page, even other modals.'
    + '<p>(You can drag this window by its title.)'
});

new jBox('Modal', {
  attach: '#open-nonmodal',
  height: 200,
  draggable: 'title',
  offset: {x: -80, y: 50},
  overlay: false,
  closeOnClick: false,
  closeOnEsc: false,
  closeButton: 'title',
  title: 'I\'m a second jBox non-modal window',
  content: 'This window comes to the foreground when active.'
    + '<p>(You can drag this window by its title.)'
});


/* Confirm */


new jBox('Confirm', {
	content: 'Do you really want to do this?',
	cancelButton: 'Nope',
	confirmButton: 'Sure do!'
});


/* Notice */


$('#Notice-1').click(function() {
  
  new jBox('Notice', {
    content: 'Hello, I\'m a notice',
    color: 'black'
  });
  
});


$('#Notice-2').click(function() {
  
  new jBox('Notice', {
    animation: 'flip',
    color: getColor(),
    content: 'Oooh! They also come in colors'
  });
  
});


$('#Notice-3').click(function() {

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
    animation: {open: 'slide:bottom', close: 'slide:left'}
  });
  
});


$('#Notice-4').click(function() {
  
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

$('#Notice-5').click(function() {
  
  new jBox('Notice', {
    content: 'Hover me, I\'ll stick around',
    color: 'black',
    autoClose: Math.random() * 8000 + 2000,
    delayOnHover: true
  });
  
});


$('#Notice-6').click(function() {
  
  new jBox('Notice', {
    animation: 'flip',
    color: getColor(),
    autoClose: Math.random() * 8000 + 2000,
    content: 'Oooh! They also come in colors',
    delayOnHover: true,
    showCountdown: true,
    closeButton: true
  });
  
});


$('#Notice-7').click(function() {

  new jBox('Notice', {
    theme: 'NoticeFancy',
    attributes: {
      x: 'left',
      y: 'bottom'
    },
    color: getColor(),
    content: getString(),
    title: getTitle(),
    maxWidth: 600,
    audio: '../assets/audio/bling2',
    volume: 80,
    autoClose: Math.random() * 8000 + 2000,
    animation: {open: 'slide:bottom', close: 'slide:left'},
    delayOnHover: true,
    showCountdown: true,
    closeButton: true
  });
  
});


$('#Notice-8').click(function() {
  
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
    autoClose: Math.random() * 8000 + 2000,
    color: getColor(),
    title: 'Tadaaa! I\'m single',
    content: 'Open another notice, I won\'t stack',
    delayOnHover: true,
    showCountdown: true,
    closeButton: true
  });
  
});


/* Image */


new jBox('Image', {
  imageCounter: true,
  imageCounterSeparator: ' of '
});


/* Additional JS for demo purposes  */


$('#Tooltip-4').mouseenter(function() {
  $('#Tooltip-4').addClass('active').html('Wait...');
}).mouseleave(function() {
  $('#Tooltip-4').addClass('active').html('Wait...');
});

$('.target-notice').click(function() {
  $(this).addClass('active').html('Click me again');
}).mouseleave(function() {
  $(this).removeClass('active').html('Click me');
});

var colors = ['red', 'green', 'blue', 'yellow'], index = 0;
var getColor = function () {
  (index >= colors.length) && (index = 0);
  return colors[index++];
};

var strings = ['Short', 'You just switched the internet off', 'Please do not click too hard - next time we\'ll notify google.', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'];
var getString = function () {
  return strings[Math.floor(Math.random()*strings.length)];
};

var titles = ['Congrats', 'Success', 'Thank you', false, false, false];
var getTitle = function () {
  return titles[Math.floor(Math.random()*strings.length)];
};

});

