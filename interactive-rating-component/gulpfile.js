const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
// const imagemin = require('gulp-imagemin');
// const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');
// const cleanCss = require('gulp-clean-css');
const browsersync = require('browser-sync').create();
// const autoPrefixer = require('gulp-autoprefixer');

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
// function imageMin(){
//   return src('src/images/*.+(png|jpg|gif)')
//   .pipe(imagemin())
//   .pipe(dest('dist/images'));
// }

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
  watch('html/*.html', browsersyncReload);
  watch(['src/sass/**/*.scss', 'src/js/*.js'], series(scssTask, jsTask,browsersyncReload));
}

//Default gulp task
exports.default = series(
  scssTask,
  jsTask,
  browsersyncServe,
  watchTask
);