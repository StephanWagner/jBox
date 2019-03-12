var fs = require('fs');

// Check if asset exists
function checkForAsset(path) {
  var pathFound = true;
  try {
    fs.accessSync(path);
  } catch (e) {
    pathFound = false;
  }
  return pathFound;
}

// Plugins
var plugins = [
  'Confirm',
  'Image',
  'Notice'
];

// Themes
var themes = [
  'NoticeFancy',
  'TooltipBorder',
  'TooltipBorderThick', 
  'TooltipDark', 
  'TooltipError', 
  'TooltipSmall', 
  'TooltipSmallGray'
];

// Check for default files
for (let filename of ['jBox', 'jBox.all']) {
  for (let extension of ['.js', '.min.js', '.css', '.min.css']) {
    test('Asset ' + filename + extension + ' exists', () => {
      expect(checkForAsset('./dist/' + filename + extension)).toBe(true);
    });
  }
}

// Check for plugin files
for (let plugin of plugins) {
  for (let extension of ['.js', '.min.js', '.css', '.min.css']) {
    let filename = 'jBox.' + plugin;
    test('Plugin ' + plugin + ': Asset ' + filename + extension + ' exists', () => {
      expect(checkForAsset('./dist/plugins/' + filename + extension)).toBe(true);
    });
  }
}

// Check for theme files
for (let theme of themes) {
  for (let extension of ['.css', '.min.css']) {
    let filename = 'jBox.' + theme;
    test('Theme ' + theme + ': Asset ' + filename + extension + ' exists', () => {
      expect(checkForAsset('./dist/themes/' + filename + extension)).toBe(true);
    });
  }
}