// import folders from 'gulp';
// import gulpSass from 'gulp-sass';
// import dartSass from 'sass';
// import postcss from 'gulp-postcss';
// import cssnano from 'cssnano';
// import terser from 'gulp-terser';
// import imagemin from 'gulp-imagemin';
// import browserSync from 'browser-sync';
// // import browserSync from 'browser-sync';
// const {src, dest, watch, series} = folders;
// const sass = gulpSass(dartSass);
// const browsersync = browserSync.create();

const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const browsersync = require('browser-sync').create();

//Sass task
function scssTask(){
  return src('src/sass/**/*.scss', { sourcemaps: true})
  .pipe(sass())
  .pipe(postcss([cssnano()]))
  .pipe(dest('dist/css', {sourcemaps: '.'}));
}

//Javascript task
function jsTask(){
  return src('src/js/*.js', { sourcemaps: true})
  .pipe(terser())
  .pipe(dest('dist/js', {sourcemaps: '.'}));
}

//Image task
function imageMin(){
  return src('src/images/*')
  .pipe(imagemin())
  .pipe(dest('dist/images'));
}

//Browsersync task
function browsersyncServe(cb){
  browsersync.init({
    server: {
      baseDir: '.'
    }
  });
  cb();
}

function browsersyncReload(cb){
  browsersync.reload();
  cb();
}

//Watch Task
function watchTask(){
  watch('*.html', browsersyncReload);
  watch(['src/sass/**/*.scss', 'src/js/*.js','src/images/*' ], series(scssTask, jsTask, imageMin, browsersyncReload));
}

//Default gulp task
exports.default = series(
  scssTask,
  jsTask,
  imageMin,
  browsersyncServe,
  watchTask
);