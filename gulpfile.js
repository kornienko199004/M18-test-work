const gulp = require('gulp');
const less = require('gulp-less');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const run = require('run-sequence');
const del = require('del');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const sorting = require('postcss-sorting');
const svgstore = require('gulp-svgstore');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const options = {
position: "absolute",
top: 0,
right: 0,
bottom: 0,
left: 0,
"z-index": 1,

display: "block",
"flex-flow": "row wrap",
"flex-direction": "row",
"flex-wrap": "wrap",
"justify-content": "flex-start",
"align-items": "stretch",
"align-content": "stretch",
"align-self": "auto",
order: 0,

"box-sizing": "border-box",
flex: "1 1 20%",
"flex-grow": 1,
"flex-shrink": 1,
"flex-basis": "20%",
width: "auto",
"min-width": 0,
"max-width": "none",
height: "auto",
"min-height": 0,
"max-height": "none",
padding: "0 0 0 0",
"padding-top": 0,
"padding-right": 0,
"padding-bottom": 0,
"padding-left": 0,
margin: "0 0 0 0",
"margin-top": 0,
"margin-right": 0,
"margin-bottom": 0,
"margin-left": 0,

font: "italic bold 12px/2 Arial, sans-serif",
"font-family": "Arial, sans-serif",
"font-size":" 12px",
"font-stretch": "condensed",
"font-weight": 'bold',
"line-height": 2,
"letter-spacing": "0.05em",
"word-spacing": "normal",
"text-decoration": "underline",
"vertical-align": 'baseline',

color: "#000",
"background-image": 'url("images/bg.png")',
"background-position": "left top",
"background-size": "50% 50%",
"background-repeat": "no-repeat",
"background-color": "#fff",

border: "1px solid #000",
"border-color": "#000",
"border-top": "thick double #000",
outline: "1px solid #f00",
"box-shadow": "inset 5px 5px 4px 2px rgba(0, 0, 0, 0.5)",
};

const optionsArray = Object.keys(options);

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
    return gulp.src('build/css/style.css')
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

      'properties-order': optionsArray,

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

  gulp.watch('less/**/*.less', ['style', 'css']);
  gulp.watch('*.html', ['html']);
  gulp.watch('src/**/*.js', ['babel']);
});

gulp.task('sprite', function () {
  return gulp.src('img/**/*.svg*')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('babel', () =>
    gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/js'))
);

gulp.task('copy', function () {
  return gulp.src([
    'fonts/**',
    'img/**'
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
    'babel',
    'copy',
    'style',
    'html',
    'css',
    'sprite',
    'serve',
    done
  );
});
