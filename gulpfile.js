var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

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

// CSS
var styles = [{
  name: 'jBox',
  src: ['./src/scss/jBox.scss'],
  dest: './dist/'
}, {
  name: 'jBox.all',
  src: [
    './src/scss/jBox.scss',
    './src/scss/plugins/*.scss',
    './src/scss/themes/*.scss'
  ],
  dest: './dist/'
}];

for (let plugin of plugins) {
  styles.push({
    name: 'jBox.' + plugin,
    src: ['./src/scss/plugins/jBox.' + plugin + '.scss'],
    dest: './dist/plugins/'
  });
}

for (let theme of themes) {
  styles.push({
    name: 'jBox.' + theme,
    src: ['./src/scss/themes/jBox.' + theme + '.scss'],
    dest: './dist/themes/'
  });
}

// JavaScript
var scripts = [{
  name: 'jBox',
  src: [
    './src/js/jBox.js',
    './src/js/umd.js'
  ],
  dest: './dist/'
}, {
  name: 'jBox.all',
  src: [
    './src/js/jBox.js',
    './src/js/plugins/*.js',
    './src/js/umd.js'
  ],
  dest: './dist/'
}];

for (let plugin of plugins) {
  scripts.push({
    name: 'jBox.' + plugin,
    src: ['./src/js/plugins/jBox.' + plugin + '.js'],
    dest: './dist/plugins/'
  });
}

// Config tasks
let defaultTasks = [];
let buildTasks = [];
let watchTasks = [];

// Config CSS tasks
for (const item of styles) {

  // Concat CSS
  const cssConcat = function () {
    return gulp
      .src(item.src)
      .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError))
      .pipe(concat(item.name + '.css'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(item.dest));
  };

  // Store as a task
  gulp.task('cssConcat-' + item.name, cssConcat);

  // Add to default tasks
  defaultTasks.push('cssConcat-' + item.name);

  // Add to watch tasks
  watchTasks.push({
    src: item.src,
    task: cssConcat
  });

  // Build CSS
  const cssBuild = function () {
    return gulp
      .src(item.dest + item.name + '.css')
      .pipe(rename(item.name + '.min.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest(item.dest));
  };

  // Store as a task
  gulp.task('cssBuild-' + item.name, cssBuild);

  // Add to build tasks
  buildTasks.push('cssBuild-' + item.name);
}

// Config JavaScript tasks
for (let item of scripts) {

  // Concat JavaScript
  const jsConcat = function () {
    return gulp
      .src(item.src)
      .pipe(sourcemaps.init())
      .pipe(concat(item.name + '.js'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(item.dest));
  };

  // Store as a task
  gulp.task('jsConcat-' + item.name, jsConcat);

  // Add to default tasks
  defaultTasks.push('jsConcat-' + item.name);

  // Add to watch tasks
  watchTasks.push({
    src: item.src,
    task: jsConcat
  });

  // Build JavaScript
  const jsBuild = function () {
    return gulp
      .src(item.dest + item.name + '.js')
      .pipe(rename(item.name + '.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(item.dest));
  };

  // Store as a task
  gulp.task('jsBuild-' + item.name, jsBuild);

  // Add to build tasks
  buildTasks.push('jsBuild-' + item.name);
}

// Watch tasks
function watch() {
  for (const watchTask of watchTasks) {
    gulp.watch(watchTask.src, watchTask.task);
  }
}

exports.default = gulp.series(defaultTasks);
exports.watch = gulp.series(defaultTasks, watch);
exports.build = gulp.series(defaultTasks, buildTasks);
