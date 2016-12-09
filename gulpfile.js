/* File: gulpfile.js */

// grab our gulp packages
var gulp = require('gulp'),
	express = require('express'),
	livereload = require('gulp-livereload'),
   less = require('gulp-less'),
   // sass   = require('gulp-sass'),
   sourcemaps = require('gulp-sourcemaps'),
   autoprefixer = require('gulp-autoprefixer'),
<<<<<<< HEAD
   rename = require('gulp-rename'),
=======
>>>>>>> 4ec0fbcd85b0c1ea60a9c6a95be278d6cb413153
   minifycss = require('gulp-minify-css'),
   concat = require('gulp-concat'),
   jshint = require('gulp-jshint'),
   uglify = require('gulp-uglify'),
   mainBowerFiles = require('gulp-main-bower-files'),
<<<<<<< HEAD
   open = require('gulp-open'),
   filter = require('gulp-filter');
=======
   flatten = require('gulp-flatten'),
   open = require('gulp-open'),
   nunjucksRender = require('gulp-nunjucks-render'),
   filter = require('gulp-filter'),
   svgmin = require('gulp-svgmin'),
   data = require('gulp-data');
>>>>>>> 4ec0fbcd85b0c1ea60a9c6a95be278d6cb413153

config ={
	src : 'src',
	dest : 'public'
}

/**
 *
 * Start your engines
 *
 */

<<<<<<< HEAD
gulp.task('default', ['html','styles', 'js' ,'bowerJs','bowerLess','server','watch'], function(){
=======
gulp.task('default', ['svg','html','styles', 'imgs', 'js' ,'bowerJs','bowerCss','server','watch']);

gulp.task('open', ['default'], function(){
>>>>>>> 4ec0fbcd85b0c1ea60a9c6a95be278d6cb413153
	gulp.src(__filename)
  .pipe(open({uri: 'http://localhost:4000'}));
});

/**
 *
 * Starts the server at localhost:4000
 *
 */

gulp.task('server',function(){
	var app = express();
	app.use(express.static(config.dest));
	app.listen(4000);
});

/**
 *
 * Watches the src files and peforms the nesscary tasks
 *
 */

gulp.task('watch', function(){
	livereload.listen();

<<<<<<< HEAD
	gulp.watch(config.src + '/js/*/**.js',['js']);
	gulp.watch(config.src + '/**/*.html',['html']);
	gulp.watch(config.src + '/less/*/**.less',['styles']);
=======
	gulp.watch(config.src + '/js/**/*.js',['js']);
	gulp.watch(config.src + '/img/**/*.**',['imgs']);
	gulp.watch(config.src + '/**/*.+(html|nunjucks)',['html']);
	gulp.watch(config.src + '/pages/works/works.json',['html']);
	gulp.watch(config.src + '/less/**/*.less',['styles']);
>>>>>>> 4ec0fbcd85b0c1ea60a9c6a95be278d6cb413153
})


gulp.task('bowerJs', function(){
<<<<<<< HEAD
	return gulp.src('./bower.json')
			.pipe(mainBowerFiles())
			.pipe(filter('**/*.js'))
			.pipe(concat('vendor.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest(config.dest + '/js'));
=======
	var jsFilter = filter(['**/*.js','!**/backbone.js','!**/underscore.js','!**/require.js','!**/jquery.js','!**/jquery.fullpage.js'], {restore: true});

	return gulp.src('./bower.json')
			.pipe(mainBowerFiles({
				overrides: {
					flickity : {
						main : [
					    "js/index.js",
						 "js/cell.js",
						 "js/animate.js",
						 "js/flickity.js",
						 "js/drag.js",
						 "js/prev-next-button.js",
						 "js/page-dots.js",
						 "js/player.js",
						 "js/add-remove-cell'.js",
						 "js/lazyload.js",
					    "css/flickity.css"
						]
					},
					async: {
						main: "dist/async.js"
					},
					"fullpage.js" : {
						main: [
						 "dist/jquery.fullpage.js"
						],
					}
				}
			}))

			.pipe(jsFilter)
			// .pipe(flatten())
			.pipe(concat('vendor.min.js'))
			.pipe(jsFilter.restore)
			.pipe(filter(['**/*.js']))
			.pipe(flatten())
			.pipe(uglify())
			.pipe(gulp.dest(config.dest + '/assets/js/libs'));
>>>>>>> 4ec0fbcd85b0c1ea60a9c6a95be278d6cb413153

});

gulp.task('js', function(){
<<<<<<< HEAD
	return gulp.src(config.src + '/js/*.js')
			.pipe(gulp.dest(config.dest + '/js'))
=======
	return gulp.src(config.src + '/js/**/*.js')
			.pipe(uglify())
			.pipe(gulp.dest(config.dest + '/assets/js'))
>>>>>>> 4ec0fbcd85b0c1ea60a9c6a95be278d6cb413153
			.pipe(livereload());
});

gulp.task('html', function(){
<<<<<<< HEAD
	return gulp.src(config.src + '/**/*.html')
			.pipe(gulp.dest(config.dest + '/'))
			.pipe(livereload());
});

gulp.task('bowerLess', function(){
		gulp.src('./bower.json')
		.pipe(mainBowerFiles())
		.pipe(filter('**/*.less'))
		.pipe(less())
		.pipe(minifycss())
		.pipe(concat('lib.min.css'))
		.pipe(gulp.dest(config.dest + '/css'))

	return gulp.src('./bower.json')
		.pipe(mainBowerFiles())
		.pipe(filter('**/*.less'))
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(sourcemaps.write())
		.pipe(concat('lib.css'))
		.pipe(gulp.dest(config.dest + '/css'));
=======

  return gulp.src('src/pages/**/*.+(html|nunjucks)')
	.pipe(data(function() {
	  return require('./src/pages/works/works.json')
	}))
  .pipe(nunjucksRender({
      path: ['src/templates']
    }))
  .pipe(gulp.dest(config.dest + '/'))
  .pipe(livereload());

});

gulp.task('bowerCss', function(){
		gulp.src('./bower.json')
		.pipe(mainBowerFiles())
		.pipe(filter('**/*.css'))
		.pipe(minifycss())
		.pipe(concat('lib.min.css'))
		.pipe(gulp.dest(config.dest + '/assets/css'))

>>>>>>> 4ec0fbcd85b0c1ea60a9c6a95be278d6cb413153
});

gulp.task('styles', function() {
  return gulp.src(config.src + '/less/app.less')
			.pipe(sourcemaps.init())
			.pipe(less())
<<<<<<< HEAD
			.pipe(sourcemaps.write())
			.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
			.pipe(gulp.dest(config.src + '/css'))
			.pipe(rename({ suffix: '.min' }))
			.pipe(minifycss())
			.pipe(gulp.dest(config.dest + '/css'))
			.pipe(livereload());
});

<<<<<<< HEAD

=======
=======
			.pipe(minifycss())
			.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(config.dest + '/assets/css'))
			.pipe(livereload());
});

gulp.task('imgs', function() {
  return gulp.src(config.src + '/img/**/*.**')
			.pipe(gulp.dest(config.dest + '/assets/img'))
			.pipe(livereload());
});

gulp.task('svg', function () {
    return gulp.src(config.src + '/img/svg-pre/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest(config.src + '/img/svg'));
});

>>>>>>> 4ec0fbcd85b0c1ea60a9c6a95be278d6cb413153
>>>>>>> 03556272bf0cf24af615a0342dee4e5c036f5120
/**
 *
 * Notes:
 *
 */

// gulp.task
<<<<<<< HEAD
// gulp.src.pipe()
// gulp.watch
// gulp.dest
=======
// gulp.src().pipe()
// gulp.watch
// gulp.dest
>>>>>>> 4ec0fbcd85b0c1ea60a9c6a95be278d6cb413153
