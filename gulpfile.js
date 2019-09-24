const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssclean = require('postcss-clean');
const imagemin = require('gulp-imagemin');
const banner = require('gulp-banner');
const del = require('del');
const path = require('path');
const shell = require('gulp-shell');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const data = require('gulp-data');
const nunjucks = require('gulp-nunjucks');
const markdown = require('markdown');
const browserSync = require('browser-sync').create();
const log = require('fancy-log');
const colors = require('ansi-colors');
const pkg = require('./package.json');

// Variables
// -----------------
const dir = {
 dist: './dist/',
 src: './src/',
 styles: './assets/styles/',
 scripts: './assets/scripts/'
};

const comment = '/*\n' +
    ' * Automatically Generated - DO NOT EDIT \n' +
    ' * Generated on <%= new Date().toISOString().substr(0, 19) %> \n' +
    ' * <%= pkg.name %> <%= pkg.version %>\n' +
    ' * <%= pkg.description %>\n' +
    ' * <%= pkg.homepage %>\n' +
    ' *\n' +
    ' * Copyright <%= new Date().getFullYear() %>, <%= pkg.author %>\n' +
    ' * Released under the <%= pkg.license %> license.\n' +
    '*/\n\n';


// Development Tasks
// -----------------

//Nunjucks
gulp.task('nunjucks', () => {
  return gulp
    .src(path.join(dir.src, '/*.html'))
    //Get some data
    .pipe(data(function() {
      return require('./data/data.json')
    }))
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(dir.dist))
});


//  Sass: compile sass to css
//===========================================
gulp.task('sass', () => {
  return gulp
    .src(path.join(dir.styles, '*.scss'))
    .pipe(plumber(function(error) {
      // Output an error message
      log(colors.bold.red('Error (' + error.plugin + '): ' + error.message));
      // emit the end event, to properly end the task
      this.emit('end');
    })
    )
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.join(dir.dist, 'css'))) // Outputs it in the css folder
    .pipe(browserSync.stream()); // reload
});

gulp.task('sass-build', () => {
  return gulp
    .src(path.join(dir.styles, '*.scss'))
    .pipe(plumber(function(error) {
      // Output an error message
      log(colors.bold.red('Error (' + error.plugin + '): ' + error.message));
      // emit the end event, to properly end the task
      this.emit('end');
    })
    )
    .pipe(sass())
    //Polyfill for object fit
    .pipe(postcss([require('postcss-object-fit-images')]))
    //Polyfill for css vars
    .pipe(postcss([postcssCustomProperties()]))
    //Minify
    .pipe(postcss([postcssclean()]))
    .pipe(gulp.dest(path.join(dir.dist, 'css')))
});

// Watchers
gulp.task('watch', () => {
  gulp.watch(path.join(dir.styles, '**/*.scss'), gulp.series('sass'));
  gulp.watch(path.join(dir.scripts, '**/*.js'), gulp.series('scripts'));
  gulp.watch(path.join(dir.src, '**/*.+(html|njk)'), gulp.series('nunjucks'));
  gulp.watch(path.join(dir.dist, '*html')).on('change', browserSync.reload);
});


// Scripts
gulp.task('scripts', () => {  
  return gulp
    .src([
      'assets/vendor/photoswipe/dist/photoswipe.min.js',
      'assets/vendor/photoswipe/dist/photoswipe-ui-default.min.js',
      'assets/vendor/astro.min.js',
      'assets/scripts/scripts.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(path.join(dir.dist, 'scripts')))
});

// Scripts
gulp.task('babel', () => {  
  return gulp.src([
    'assets/scripts/scripts.js'
  ])
  .pipe(babel({
    presets: ['@babel/env'],
    plugins: ['@babel/plugin-transform-template-literals']
   }))
  .pipe(gulp.dest('assets/scripts/babel/'))
});

// Scripts
gulp.task('scripts-build', () => {  
  return gulp
  .src([
    'assets/vendor/photoswipe/dist/photoswipe.min.js',
    'assets/vendor/photoswipe/dist/photoswipe-ui-default.min.js',
    'assets/vendor/astro.min.js',
    'assets/scripts/babel/scripts.js'
  ])
  .pipe(concat('scripts.js'))
  .pipe(terser()) //accepts ES6 template literals 
  .pipe(gulp.dest(path.join(dir.dist, 'scripts')))
});

// Cleaning
gulp.task('clean', () => del([ dir.dist ]) );

// Images
gulp.task('images', () => {
  return gulp
    .src('assets/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(gulp.dest(path.join(dir.dist, 'images')))
});

// Banner
gulp.task('banner', () => {
  return gulp
    .src(path.join(dir.dist, 'css/main.css'))
    .pipe(banner(comment, {
        pkg: pkg
    }))
    .pipe(gulp.dest(path.join(dir.dist, 'css')));
});

// Moving misc files
gulp.task('move', () => {  
  return gulp
      .src([
      'assets/scripts/gallery.js', 
      'assets/vendor/js.cookie.js'
      ])
    .pipe(gulp.dest(path.join(dir.dist, 'scripts')));
});

// Static Server + watching scss/html files
gulp.task('serve', () => {

  browserSync.init({
    server: dir.dist
  });

});

//  Testing
//===========================================
gulp.task('tests', shell.task('$(npm bin)/cypress run'))

// Init
// -----------------
const init = gulp.series('nunjucks', gulp.parallel('sass', 'scripts', 'watch'), 'serve');
const build = gulp.series('clean', 'babel', 'nunjucks', gulp.parallel('sass-build', 'scripts-build', 'images'), 'move', 'banner');
exports.init = init;
exports.build = build;