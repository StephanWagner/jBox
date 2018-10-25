'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

// Plugins

var plugins = ['Confirm', 'Image', 'Notice'];

// CSS

var styles = [
  {
    name: 'jBox',
    src: ['./src/scss/jBox.scss'],
    dest: './dist/'
  },
  {
    name: 'jBox.all',
    src: ['./src/scss/**/*.scss'],
    dest: './dist/'
  }
];

for (let plugin of plugins) {
  styles.push({
    name: 'jBox.' + plugin,
    src: ['./src/scss/plugins/jBox.' + plugin + '.scss'],
    dest: './dist/plugins/'
  });
}

// JavaScript

var scripts = [
  {
    name: 'jBox',
    src: [
      './src/js/jBox.js'
    ],
    dest: './dist/'
  },
  {
    name: 'jBox.all',
    src: [
      './src/js/jBox.js',
      './src/js/plugins/*.js',
    ],
    dest: './dist/'
  }
];

for (let plugin of plugins) {
  scripts.push({
    name: 'jBox.' + plugin,
    src: ['./src/js/plugins/jBox.' + plugin + '.js'],
    dest: './dist/plugins/'
  });
}

var defaultTasks = [];
var buildTasks = [];
var watchTasks = [];

// CSS tasks

for (let item of styles) {

  gulp.task('styles-dev-' + item.name, function() {
    return gulp
      .src(item.src)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(concat(item.name + '.css'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(item.dest));
  });

  defaultTasks.push('styles-dev-' + item.name);

  watchTasks.push({
    src: item.src,
    task: 'styles-dev-' + item.name
  });
  
  gulp.task('styles-prod-' + item.name, ['styles-dev-' + item.name], function() {
    return gulp
      .src(item.dest + item.name + '.css')
      .pipe(rename(item.name + '.min.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest(item.dest));
  });

  buildTasks.push('styles-prod-' + item.name);
}

// JavaScript tasks

for (let item of scripts) {

  gulp.task('scripts-dev-' + item.name, function() {
    return gulp
      .src(item.src)
      .pipe(sourcemaps.init())
      .pipe(concat(item.name + '.js'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(item.dest));
  });

  defaultTasks.push('scripts-dev-' + item.name);

  watchTasks.push({
    src: item.src,
    task: 'scripts-dev-' + item.name
  });
  
  gulp.task('scripts-prod-' + item.name, ['scripts-dev-' + item.name], function() {
    return gulp
      .src(item.dest + item.name + '.js')
      .pipe(rename(item.name + '.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(item.dest));
  });

  buildTasks.push('scripts-prod-' + item.name);
}

gulp.task('build', buildTasks);
gulp.task('default', defaultTasks);

gulp.task('watch', defaultTasks, function() {
  for (let item of watchTasks) {
    gulp.watch(item.src, [item.task]);
  }
});
