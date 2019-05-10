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
  try { jBoxConfirmWrapper && jBoxConfirmWrapper(jBox, jQuery); } catch(e) { console.error(e); }
  try { jBoxImageWrapper && jBoxImageWrapper(jBox, jQuery); } catch(e) { console.error(e); }
  try { jBoxNoticeWrapper && jBoxNoticeWrapper(jBox, jQuery); } catch(e) { console.error(e); }
  return jBox;
}));
