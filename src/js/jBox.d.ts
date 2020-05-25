declare namespace jBox {
  interface jBoxOptions {
    /** Choose a unique id, otherwise jBox will set one for you (jBox1, jBox2, ...) */
    id?: string;

    /** The width of the content area */
    width?: 'auto' | number;

    /** The height of the content area */
    height?: 'auto' | number;

    /** Minimal width of content area */
    minWidth?: number;

    /** Minimal height of content area */
    minHeight?: number;

    /** Maximal width of content area */
    maxWidth?: number;

    /** Maximal height of content area */
    maxHeight?: number;

    /** Adjusts width to fit the viewport */
    responsiveWidth?: boolean;

    /** Adjusts height to fit the viewport */
    responsiveHeight?: boolean;

    /** Don't adjust width below this value (in pixel) */
    responsiveMinWidth?: number;

    /** Don't adjust height below this value (in pixel) */
    responsiveMinHeight?: number;

    /** A jQuery selector to elements that will open and close your jBox, e.g. '.tooltip' */
    attach?: JQuery<HTMLElement>;

    /** Defines with which event the jBox opens or closes when interacting with the attached element */
    trigger?: 'click' | 'mouseenter' | 'touchclick';

    /** Prevent the default event when opening jBox, e.g. don't follow the href in a link */
    preventDefault?: boolean;

    /** Sets the content of your jBox. You can use jQuery elements to append elements (set CSS style display to none so the elements won't show up on your page) */
    content?: string | JQuery<HTMLElement>;

    /** Get the content from an attribute when jBox opens, e.g. 'data-content'. Use 'html' to get the attached elements HTML as content */
    getContent?: string;

    /** Adds a title to your jBox */
    title?: string;

    /** Get the title from an attribute when jBox opens, e.g. 'data-title' */
    getTitle?: string;

    /** Adds a footer to your jBox */
    footer?: string;

    /** Isolates scrolling to the content container */
    isolateScroll?: boolean;

    /** When you set an URL, jBox makes an AJAX request when it opens. You can add any jQuery ajax option, e.g. beforeSend, complete, success, etc. */
    ajax?: jBoxAjaxOptions;

    /** Cancels the ajax call when you close the jBox and it's not finished yet */
    cancelAjaxOnClose?: boolean,

    /** The jQuery selector to the target element where jBox will be opened. If no element is found, jBox will use the attached element as target */
    target?: JQuery<HTMLElement>;

    /** Set an object with the horizontal position x and the vertical position y, e.g. {x: 'right', y: 'center'}. You can also set numbers for an absolute position */
    position?: { x: 'right' | 'left' | 'center' | number; y: 'top' | 'bottom' | 'center' | number };

    /** Moves your jBox outside of the target element */
    outside?: 'x' | 'y' | 'xy';

    /** Offset to final position. You can set different values for x and y with an object, e.g. {x: 15, y: -10} */
    offset?: number | { x: number; y: number };

    /** Defines which CSS attributes should be used, e.g. {x: 'right', y: 'bottom'}. Note that right and bottom can only be used when your position values are integer, e.g. {x: 300, y: 20} */
    attributes?: { x: 'right' | 'left' | 'center'; y: 'top' | 'bottom' | 'center' };

    /** Your jBox will stay on position when scrolling */
    fixed?: boolean;

    /** Adjusts your jBoxes position if there is not enough space. The value 'flip' positions the jBox on the opposite outside position, the value 'move' works only with a pointer.
     * Set to true to use both. This option overrides the reposition options */
    adjustPosition?: 'flip' | 'move' | boolean;

    /** By default jBox adjusts its position when it opens or when the window size changes, set to true to also adjust when scrolling */
    adjustTracker?: boolean;

    /** The minimal distance to the viewport edge while adjusting. Use an object to set different values, e.g. {top: 50, right: 5, bottom: 20, left: 5} */
    adjustDistance?: number | { top?: number; right?: number; bottom?: number; left?: number };

    /** Calculates new position when the window-size changes */
    reposition?: boolean;

    /** Calculates new position each time jBox opens (rather than only when it opens the first time) */
    repositionOnOpen?: boolean;

    /** Calculates new position when the content changes with .setContent() or .setTitle() */
    repositionOnContent?: boolean;

    /** Keeps current position if space permits. Applies only to 'Modal' type */
    holdPosition?: boolean;

    /** Your pointer will always point towards the target element, so the option outside needs to be 'x' or 'y'. By default the pointer is centered, set a position to move it to any side. You can also add an offset, e.g. 'left:30' or 'center:-20'  */
    pointer?: boolean | 'left' | 'right' | 'top' | 'bottom' | 'center';

    /** Setting something else than 'target' will add a pointer even if there is no target element set or found */
    pointTo?: 'target' | 'left' | 'right' | 'top' | 'bottom';

    /** Fade duration in ms, set 0 or false to disable */
    fade?: number;

    /** Animation when jBox opens or closes. To use different animations for opening and closing, use an object: {open: 'tada', close: 'flip'}.
     * You can also set the direction of the move and slide animations: {open: 'move:right', close: 'slide:top'} */
    animation?: jBoxAnimations | { open?: jBoxAnimations; close?: jBoxAnimations } | boolean;

    /** Set a jBox theme class, e.g. 'TooltipDark' */
    theme?: string;

    /** Adds classes to the wrapper */
    addClass?: string;

    /** Adds an overlay to hide page content when jBox opens (adjust color and opacity with CSS) */
    overlay?: boolean;

    /** Add a class name to the overlay */
    overlayClass?: null | string;

    /** Use a high z-index, or set to 'auto' to move the jBox to the very top when it opens */
    zIndex?: number | 'auto';

    /** Delay opening in ms. Note that the delay will be ignored if your jBox didn't finish closing */
    delayOpen?: number;

    /** Delay closing in ms. Nnote that there is always a closing delay of at least 10ms to ensure jBox won't be closed when opening right away */
    delayClose?: number;

    /** Close jBox when pressing [esc] key */
    closeOnEsc?: boolean;

    /** Close jBox with a mouseclick: true closes when you click anywhere, 'overlay' when clicking on the overlay, 'box' when clicking on the jBox itself and 'body' when you click anywhere but the jBox */
    closeOnClick?: boolean | 'body' | 'box' | 'overlay';

    /** Close jBox when the mouse leaves the jBox area or the area of the attached element */
    closeOnMouseleave?: boolean;

    /** Adds a close button to your jBox. The value true will add the button to the overlay, title or the jBox itself, in that order if any of those elements can be found */
    closeButton?: boolean | 'overlay' | 'title' | 'box';

    /** The element your jBox will be appended to. Any other element than $('body') is only useful for fixed positions or when position values are numbers */
    appendTo?: JQuery<HTMLElement>;

    /** Creates jBox and makes it available in DOM when it's being initialized, otherwise it will be created when it opens for the first time */
    createOnInit?: boolean;

    /** Blocks scrolling when jBox is open */
    blockScroll?: boolean;

    /** Adjust page elements to avoid content jumps when scrolling is blocked. See more here: https://github.com/StephanWagner/unscroll */
    blockScrollAdjust?: boolean | string | Array<string | Array<string>>;

    /** Makes your jBox draggable. Use title or provide the selector of any child element of jBox to use as the handle */
    draggable?: boolean | 'title' | JQuery<HTMLElement>;

    /** When you have multiple draggable jBoxes, the one you select will always move over the other ones */
    dragOver?: boolean;

    /** Time in ms when jBox will close automatically after it was opened */
    autoClose?: number | boolean;

    /** Preloads the audio files set in option audio. You can also preload other audio files, e.g. ['src_to_file.mp3', 'src_to_file.ogg'] */
    preloadAudio?: boolean | string[];

    /** The URL to an audio file to play when jBox opens. Set the URL without file extension, jBox will look for an .mp3 and .ogg file. To play audio when jBox closes, use an object, e.g. {open: 'src_to_audio1', close: 'src_to_audio2'} */
    audio?: string | { open?: string; close?: string };

    /** The volume of the audio in percent. To have different volumes for opening and closeing, use an object, e.g. {open: 75, close: 100} */
    volume?: number | { open?: number; close?: number };

    /** Fired when jBox is initialized. Note that you can use this in the event functions, it refers to your jBox object, e.g. onInit: function() { this.open(); } */
    onInit?: () => void;

    /** Fired when jBox attached itself to elements */
    onAttach?: () => void;

    /** Fired when jBox is positioned */
    onPosition?: () => void;

    /** Fired when jBox is created and is availible in DOM */
    onCreated?: () => void;

    /** Fired when jBox opens */
    onOpen?: () => void;

    /** Fired when jBox closes */
    onClose?: () => void;

    /** Fired when jBox is completely closed (when fading finished) */
    onCloseComplete?: () => void;

    /** Fired when dragging starts */
    onDragStart?: () => void;

    /** Fired when dragging finished */
    onDragEnd?: () => void;
  }

  /** Possible values for the 'animation' option */
  type jBoxAnimations =
    | 'zoomIn'
    | 'zoomOut'
    | 'pulse'
    | 'move'
    | 'slide'
    | 'flip'
    | 'tada'
    | 'move:right'
    | 'move:left'
    | 'move:top'
    | 'move:bottom'
    | 'slide:right'
    | 'slide:left'
    | 'slide:top'
    | 'slide:bottom';

  /** Options for AJAX calls.  */
  interface jBoxAjaxOptions {
    /** The URL to send the AJAX request to */
    url?: string | null;

    /** Data to send with your AJAX request, e.g. {id: 82, limit: 10} */
    data?: string | {};

    /** Resend the AJAX request when jBox opens. Use true to send the AJAX request call only once for every element or 'strict' to resend every time jBox opens  */
    reload?: boolean | 'strict';

    /** The attribute in the source element where the AJAX request will look for the URL, e.g. 'data-url'  */
    getURL?: string;

    /** The attribute in the source element where the AJAX request will look for the data, e.g. 'data-ajax'  */
    getData?: string;

    /** Automatically set the response as new content when the AJAX request is finished  */
    setContent?: boolean;

    /** Add a class to the wrapper when jBox is loading, set to class name or true to use the default class name 'jBox-loading' */
    loadingClass?: boolean | string,

    /** Hides the current content and adds a spinner while loading. You can pass HTML content to add your own spinner, e.g. spinner: '<div class="mySpinner"></div>'  */
    spinner?: boolean | string;

    /** Milliseconds to wait until spinner appears  */
    spinnerDelay?: number;

    /** Repositions jBox when the spinner is added or removed  */
    spinnerReposition?: boolean;
  }

  /** Additional options for the Confirm plugin */
  interface jBoxConfirmOptions extends jBoxOptions {
    /** Text for the submit button */
    confirmButton?: string;

    /** Text for the cancel button */
    cancelButton?: string;

    /** Function to execute when clicking the submit button. By default jBox will use the onclick or href attribute in that order if found */
    confirm?: () => void;

    /** Function to execute when clicking the cancel button */
    cancel?: () => void;

    /** Close jBox when the user clicks the confirm button */
    closeOnConfirm: boolean;
  }

  /** Additional options for the Image plugin */
  interface jBoxImageOptions extends jBoxOptions {
    /** The attribute to get the image source from, e.g. 'href' for a link: <a href="/path/image.jpg"> */
    src?: string;

    /** The attribute to set the galleries, e.g. 'data-jbox-gallery'. When changing this option, make sure you check the option attach, as jBox Image gets attached to [data-jbox-gallery] by default. */
    gallery?: string;

    /** The attribute where jBox gets the image label from, e.g. 'title' */
    imageLabel?: string;

    /** The fade duration for images in ms */
    imageFade?: number;

    /** How to display the images. Use CSS styles of background-position, e.g. 'cover', '50% auto' */
    imageSize?: 'cover' | 'contain' | 'auto' | string;

    /** Set to true to add an image counter, e.g. 4/20 */
    imageCounter?: boolean;

    /** HTML to separate the current image number from all image numbers, e.g. '/' or ' of ' */
    imageCounterSeparator: string;

    /** Adds a download button */
    downloadButton?: boolean;

    /** Text for the download button */
    downloadButtonText?: string | null;

    /** The attribute at the source element where to find the image to download, e.g. data-download="/path_to_image/image.jpg". If none provided, the currently active image will be downloaded */
    downloadButtonUrl?: string | null;

    /** The attribute to look for an mobile version of the image */
    mobileImageAttr?: string | null;

    /** The upper breakpoint to load the mobile image */
    mobileImageBreakpoint?: number | null;

    /** Preload the first image when page is loaded */
    preloadFirstImage?: boolean;
  }

  /** Additional options for the Notice plugin */
  interface jBoxNoticeOptions extends jBoxOptions {
    /** Add a color to your notices */
    color?: 'black' | 'red' | 'green' | 'blue' | 'yellow';

    /** Set to false to disable notice-stacking */
    stack?: boolean;

    /** Spacing between notices when they stack */
    stackSpacing?: number;

    /** When hovering the notice it won't close */
    delayOnHover?: boolean;

    /** Adds a progress bar showing the time it will take until the notice closes */
    showCountdown?: boolean;
  }


}

/** Connects the name of the plugin with the type of its options */
declare interface jBoxOptionsMap {
  Tooltip: jBox.jBoxOptions;
  Modal: jBox.jBoxOptions;
  Confirm: jBox.jBoxConfirmOptions;
  Notice: jBox.jBoxNoticeOptions;
  Image: jBox.jBoxImageOptions;
}

interface IgnoreDelay {
/** Whether to open or close immediately (true) or respect the original delay settings. */
ignoreDelay?: boolean;
}

/** The core jBox class. Create instances using 'new' e.g. new jBox('Tooltip', { attach: '.tooltip'. }) */
declare class jBox<T extends keyof jBoxOptionsMap> {
  constructor(type: T, options: jBoxOptionsMap[T]);

  /**
   * Opens the jBox. You can set a new target with the option target, e.g. {target: $('#newTarget')}.
   * If your jBox has an opening delay, you can force it to open immediately with the option ignoreDelay,
   * e.g. {ignoreDelay: true}. To set new AJAX content when opening the jBox, you can pass an AJAX object,
   * e.g. {ajax: {url: 'https://reqres.in/api/users'}}
   */
  open(options?: jBoxOptionsMap[T] & IgnoreDelay): void;

  /**
   * Closes the jBox. If your jBox has a closing delay, you can force it to close immediately with the option
   * ignoreDelay, e.g. {ignoreDelay: true}
   */
  close(options?: jBoxOptionsMap[T] & IgnoreDelay): void;

  /**
   * Calls the method open when jBox is closed and close when it is open
   */
  toggle(options?: jBoxOptionsMap[T] & IgnoreDelay): void;

  /** Sets the CSS width of the content container.
   * Optional you can set a second argument to disable the automatic repositioning of jBox, e.g. .setWidth(200, true)
   */
  setWidth(value: number, disableAutoPosition?: boolean): void;

  /** Sets the CSS height of the content container.
   * Optional you can set a second argument to disable the automatic repositioning of jBox, e.g. .setWidth(200, true)
   */
  setHeight(value: number, disableAutoPosition?: boolean): void;

  /**
   * Attaches your jBox to elements. Providing a jQuery selector is optional.
   * If you don't tell this method which elements to use, it will use the selector defined in the options.
   * This method should be called when elements, which should open or close a jBox, are being created in runtime
   */
  attach(element: JQuery<HTMLElement>): void;

  /**
   * Removes the open and close function from elements.
   */
  detach(element: JQuery<HTMLElement>): void;
  /**
   * Sets the title of your jBox. If there is no title yet, it will be created.
   * jBox will reposition if dimensions change, to disable, pass true as second argument:
   * @example .setTitle('myTitle', true)
   */
  setTitle(title: string, disableAutoPosition?: boolean): void;

  /**
   * Sets the content of your jBox. You can use jQuery elements to append elements
   * (set CSS style display to none so the elements won't show up on your page).
   * jBox will reposition if dimensions change, to disable, pass true as second argument:
   * @example .setContent('myContent', true)
   */
  setContent(content: string, disableAutoPosition?: boolean): void;

  /**
   * Reloads the AJAX request. You can pass the options url and data, e.g. {url: '/example.php', data: 'id=82'} or any jQuery ajax Option.
   */
  ajax(options: jBox.jBoxAjaxOptions): void;

  /**
   * Abort running ajax call
   */
  cancelAjax(): void;

  /**
   * Plays an audio file. Don't add the file extension, jBox will look for an .mp3 and an .ogg file.
   */
  audio(url: string, volume: number): void;

  /**
   * Recalculates your jBoxes position. You can set a new target with the option target, e.g. {target: $('#newTarget')}
   */
  position(options: jBoxOptionsMap[T]): void;

  /**
   * Animates for your jBox or any other element. The animation method is independent from the option animation.
   * By default this method will animate the jBox wrapper, to animate another element set the option element, e.g. {element: $('#animateMe')}.
   * To execute a function when the animation is finished use the option complete, e.g. {complete: function () { $('#animateMe').remove(); }}
   */
  animate(
  animation:
      | 'tada'
      | 'tadaSmall'
      | 'flash'
      | 'shake'
      | 'pulseUp'
      | 'pulseDown'
      | 'popIn'
      | 'popOut'
      | 'fadeIn'
      | 'fadeOut'
      | 'slideUp'
      | 'slideRight'
      | 'slideLeft'
      | 'slideDown',
  options?: { element?: JQuery<HTMLElement>; complete?: () => void }
  ): void;

  /**
   * Disables your jBox, you won't be able to open or close it until enabled.
   */
  disable(): void;

  /**
   * Enables your jBox, so you can close and open it again.
   */
  enable(): void;

  /**
   * Disables and hides the jBox. This doesnt affect the overlay.
   */
  hide(): void;

  /**
   * Enables and shows your jBox again.
   */
  show(): void;

  /**
   * Destroys your jBox and removes it from DOM.
   */
  destroy(): void;
}

export = jBox;

export as namespace jBox;
