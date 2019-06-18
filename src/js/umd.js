(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], function (jQuery) {
      return (root.jBox = factory(jQuery));
    });
  } else if (typeof module === 'object' && module.exports) {
    module.exports = (root.jBox = factory(require('jquery')));
  } else {
    root.jBox = factory(root.jQuery);
  }
}(this, function (jQuery) {
  var jBox = jBoxWrapper(jQuery);
  try { typeof jBoxConfirmWrapper !== 'undefined' && jBoxConfirmWrapper && jBoxConfirmWrapper(jBox, jQuery); } catch(e) { console.error(e); }
  try { typeof jBoxImageWrapper !== 'undefined' && jBoxImageWrapper && jBoxImageWrapper(jBox, jQuery); } catch(e) { console.error(e); }
  try { typeof jBoxNoticeWrapper !== 'undefined' && jBoxNoticeWrapper && jBoxNoticeWrapper(jBox, jQuery); } catch(e) { console.error(e); }
  return jBox;
}));
