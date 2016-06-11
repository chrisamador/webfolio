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
   bowerFiles = require('gulp-main-bower-files');

config ={
	src : "./src",
	dist : './dist'
}

/**
 *
 * Start your engines
 *
 */

gulp.task('default', ['styles','bowerJs','bowerCss','server','watch']);

/**
 *
 * Starts the server at localhost:4000
 *
 */

gulp.task('server',function(){
	var app = express();
	app.use(express.static(config.dist));
	app.listen(4000);
});

/**
 *
 * Watches the src files and peforms the nesscary tasks
 *
 */

gulp.task('watch', function(){
	livereload.listen();

	gulp.watch('src/js/*.js',['js']);
	gulp.watch('src/*.html',['html']);
	gulp.watch('src/less/*.less',['styles']);
})


gulp.task('bowerJs', function(){
	return gulp.src(bowerFiles())
			.pipe(filter('*.js'))
			.pipe(concat('vendor.js'))
			.pipe(uglify())
			.pipe(gulp.dest(config.dist + '/js'));
});

gulp.task('js', function(){
	return gulp.src('src/js/*.js')
			.pipe(gulp.dest(config.dist + '/js'))
			.pipe(livereload());
});

gulp.task('html', function(){
	return gulp.src('src/*.html')
			.pipe(livereload());
});

gulp.task('bowerCss', function(){
	return gulp.src(plugins.bowerFiles())
			.pipe(plugins.filter('*.css'))
			.pipe(plugins.concat('lib.css'))
			.pipe(plugins.uglify())
			.pipe(gulp.dest(config.dist + '/css'));
});

gulp.task('styles', function() {
  return gulp.src('src/less/main.less')
			.pipe(less())
			.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
			.pipe(gulp.dest('src/css'))
			.pipe(rename({ suffix: '.min' }))
			.pipe(minifycss())
			.pipe(gulp.dest(config.dist + '/css'))
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