'use strict';

const gulp         = require('gulp'),
      concat       = require('gulp-concat'),
      browserSync  = require('browser-sync'),
      uglify       = require('gulp-uglify'),
      sass         = require('gulp-sass'),
      sourcemaps   = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      jade         = require('gulp-jade'),
      rename       = require("gulp-rename"),
      imagemin     = require('gulp-imagemin'),
      pngquant     = require('imagemin-pngquant'),
      spritesmith  = require('gulp.spritesmith'),
      plumber      = require('gulp-plumber'),
      clean      = require('gulp-clean');


/* --------- paths --------- */
var paths = {
  scss: {
    location: [
      'bower_components/normalize-scss/_normalize.scss',
      'dev/scss/main.scss'
    ],
    destination: 'prod/css'
  },

  js: {
    location: [
      'bower_components/jquery/dist/jquery.js',
      'dev/js/modules/send.js',
      'dev/js/modules/navigation.js',
      'dev/js/modules/header-menu.js',
      'dev/js/modules/priceZoom.js',
      'dev/js/modules/animate.js',
      'dev/js/modules/slider.js',
      'dev/js/modules/init.js'
    ],
    destination: 'prod/js'
  }
};


/* ----- jade ----- */
gulp.task('jade-compile', function() {
  gulp.src('dev/jade/pages/index.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('prod/'))
});


/* ------ sass ------ */
gulp.task('sass-compile', function() {
  gulp.src(paths.scss.location)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat("main.min.css"))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scss.destination));
});


/* -------- concat js -------- */
gulp.task('concat-js', function() {
  return gulp.src(paths.js.location)
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.js.destination));
});


/* -------- auto sprites  -------- */
gulp.task('sprite', function() {
  var spriteData = gulp.src('dev/assets/img/icons/*.png')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      imgPath: '/assets/img/sprite.png',
      cssName: 'utils/_sprite.scss',
      algorithm: 'top-down'
    }));
  spriteData.img.pipe(gulp.dest('dev/assets/img/'));
  spriteData.css.pipe(gulp.dest('dev/scss/'));
});


/* -------- images minification  -------- */
gulp.task('img-min', function() {
  return gulp.src('dev/assets/img/**/*.png')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('prod/assets/img'));
});

/* -------- Assets clean ------- */
gulp.task('assets-clean', function () {
  return gulp.src('prod/assets', {read: false})
    .pipe(clean());
});
/* ---------- Assets copy ---------- */
gulp.task('assets-copy', function() {
  return gulp.src('dev/assets/**/*')
    .pipe(gulp.dest('prod/assets'));
});

/* -------- gulp server  -------- */
gulp.task('server', function() {
  browserSync({
    port: 9000,
    server: {
      baseDir: 'prod'
    }
  });
});


/* -------- gulp watching  -------- */
gulp.task('watch', function() {
  gulp.watch('dev/jade/**/*.jade', ['jade-compile']);
  gulp.watch('dev/scss/**/*.scss', ['sass-compile']);
  gulp.watch('dev/img/**/*', ['img-min']);
  gulp.watch('dev/js/modules/*.js', ['concat-js']);
  gulp.watch([
    'prod/**/*.html',
    'prod/js/**/*.js',
    'prod/css/**/*.css'
  ]).on('change', browserSync.reload);
});


gulp.task('default', [
  'jade-compile',
  'sass-compile',
  'concat-js',
  'server',
  'watch'
]);




