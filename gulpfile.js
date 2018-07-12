"use strict";

var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var run = require('run-sequence');
var del = require('del');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var sorting = require('postcss-sorting');
var svgstore = require('gulp-svgstore');
var rename = require('gulp-rename');

gulp.task('style', function () {
  gulp.src('less/style.less')
  .pipe(plumber())
  .pipe(less())
  .pipe(postcss([
    autoprefixer()
  ]))

  .pipe(gulp.dest('build/css'))
  .pipe(server.stream());
});

gulp.task('css', function () {
    return gulp.src('./build/css/style.css')
    .pipe(
        postcss([
            sorting({
      'order': [
        'custom-properties',
        'dollar-variables',
        'declarations',
        'at-rules',
        'rules'
      ],

      'properties-order': ["height", "width", "content", "position","top","right","bottom","left","z-index", "display"],

      'unspecified-properties-position': 'bottom'
    })
        ])
    )
    .pipe(
        gulp.dest('build/css')
    );
});

gulp.task('html', function () {
  return gulp.src('*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest('build'));
});

gulp.task('serve', function () {
  server.init({
    server: "build/"
  });

  gulp.watch('less/**/*.less', ['style']);
  gulp.watch('*.html', ['html']);
});

gulp.task('sprite', function () {
  return gulp.src('img/**/*.svg*')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('copy', function () {
  return gulp.src([
    'fonts/**',
    'img/**',
    'js/**'
    ], {
      base: '.'
    })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del('buld');
});

gulp.task('build', function (done) {
  run(
    'clean',
    'copy',
    'style',
    'html',
    'css',
    'sprite',
    'serve',
    done
  );
});
