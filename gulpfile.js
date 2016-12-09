/* File: gulpfile.js */

// grab our gulp packages
var gulp = require('gulp'),
	express = require('express'),
	livereload = require('gulp-livereload'),
   less = require('gulp-less'),
   // sass   = require('gulp-sass'),
   sourcemaps = require('gulp-sourcemaps'),
   autoprefixer = require('gulp-autoprefixer'),
   rename = require('gulp-rename'),
   minifycss = require('gulp-minify-css'),
   concat = require('gulp-concat'),
   jshint = require('gulp-jshint'),
   uglify = require('gulp-uglify'),
   mainBowerFiles = require('gulp-main-bower-files'),
   open = require('gulp-open'),
   filter = require('gulp-filter');

config ={
	src : 'src',
	dest : 'public'
}

/**
 *
 * Start your engines
 *
 */

gulp.task('default', ['html','styles', 'js' ,'bowerJs','bowerLess','server','watch'], function(){
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

	gulp.watch(config.src + '/js/*/**.js',['js']);
	gulp.watch(config.src + '/**/*.html',['html']);
	gulp.watch(config.src + '/less/*/**.less',['styles']);
})


gulp.task('bowerJs', function(){
	return gulp.src('./bower.json')
			.pipe(mainBowerFiles())
			.pipe(filter('**/*.js'))
			.pipe(concat('vendor.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest(config.dest + '/js'));

});

gulp.task('js', function(){
	return gulp.src(config.src + '/js/*.js')
			.pipe(gulp.dest(config.dest + '/js'))
			.pipe(livereload());
});

gulp.task('html', function(){
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
});

gulp.task('styles', function() {
  return gulp.src(config.src + '/less/app.less')
			.pipe(sourcemaps.init())
			.pipe(less())
			.pipe(sourcemaps.write())
			.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
			.pipe(gulp.dest(config.src + '/css'))
			.pipe(rename({ suffix: '.min' }))
			.pipe(minifycss())
			.pipe(gulp.dest(config.dest + '/css'))
			.pipe(livereload());
});


/**
 *
 * Notes:
 *
 */

// gulp.task
// gulp.src.pipe()
// gulp.watch
// gulp.dest