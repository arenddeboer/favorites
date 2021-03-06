var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Paths
var scss = 'assets/scss/**/*';
var css = 'assets/css/';

var js_admin_source = [
	'assets/js/src/simple-favorites-admin.js'
];

var js_frontend_source = [
	'assets/js/src/simple-favorites.js'
];

var js_compiled = 'assets/js/';

/**
* Smush the admin Styles and output
*/
gulp.task('scss', function(){
	return gulp.src(scss)
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(autoprefix('last 15 version'))
		.pipe(gulp.dest(css))
		.pipe(plumber())
		.pipe(livereload())
		.pipe(notify('Favorites styles compiled & compressed.'));
});

/**
* uncompressed styles
*/
gulp.task('uncompressed_styles', function(){
	return gulp.src(scss)
		.pipe(sass({ outputStyle: 'expanded' }))
		.pipe(autoprefix('last 15 version'))
		.pipe(rename('styles-uncompressed.css'))
		.pipe(gulp.dest(css))
		.pipe(plumber())
});

/**
* Admin Scripts
*/
gulp.task('admin_scripts', function(){
	return gulp.src(js_admin_source)
		.pipe(concat('simple-favorites-admin.min.js'))
		.pipe(gulp.dest(js_compiled))
		.pipe(uglify())
		.pipe(gulp.dest(js_compiled))
		.pipe(notify('Simple Favorites admin scripts compiles & compressed.'));
});

/**
* Front end Scripts
*/
gulp.task('frontend_scripts', function(){
	return gulp.src(js_frontend_source)
		.pipe(concat('simple-favorites.min.js'))
		.pipe(gulp.dest(js_compiled))
		.pipe(uglify())
		.pipe(gulp.dest(js_compiled))
		.pipe(notify('Simple Favorites front end scripts compiles & compressed.'));
});


/**
* Watch Task
*/
gulp.task('watch', function(){
	livereload.listen(35829);
	gulp.watch(scss, ['scss', 'uncompressed_styles']);
	gulp.watch(js_admin_source, ['admin_scripts']);
	gulp.watch(js_frontend_source, ['frontend_scripts']);
});

/**
* Default
*/
gulp.task('default', ['scss', 'uncompressed_styles', 'admin_scripts', 'frontend_scripts', 'watch']);