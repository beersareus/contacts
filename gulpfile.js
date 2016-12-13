var gulp = require('gulp'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	uglify = require('gulp-uglify'),
	usemin = require('gulp-usemin'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	changed = require('gulp-changed'),
	rev = require('gulp-rev'),
	browserSync = require('browser-sync'),
	del = require('del'),
	ngannotate = require('gulp-ng-annotate');

//setup - copy downloaded files to app directory
gulp.task('setup', ['clean'], function() {
	gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
		.pipe(gulp.dest('./app/fonts'));
	gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
		.pipe(gulp.dest('./app/fonts'));
	gulp.src('./bower_components/font-awesome/css/font-awesome.min.css')
		.pipe(gulp.dest('./app/styles'));
	gulp.src('./bower_components/bootstrap/dist/css/**/*.css')
		.pipe(gulp.dest('./app/styles'));
	gulp.src('./bower_components/bootstrap-social/*.css')
		.pipe(gulp.dest('./app/styles'));
	gulp.src(['./bower_components/jquery/dist/jquery.js', './bower_components/jquery/dist/jquery.min.js'])
		.pipe(gulp.dest('./app/scripts'));
	gulp.src('./bower_components/angular/angular.min.js')
		.pipe(gulp.dest('./app/scripts'));
	gulp.src('./bower_components/angular-ui-router/release/angular-ui-router.min.js')
		.pipe(gulp.dest('./app/scripts'));
	gulp.src('./bower_components/angular-resource/angular-resource.min.js')
		.pipe(gulp.dest('./app/scripts'));
	gulp.src('steps.txt')
		.pipe(gulp.dest('./app/views'));
	gulp.src('steps.txt')
		.pipe(gulp.dest('./app/images'));
});

// Clean
gulp.task('clean', function() {
	return del(['dist']);
});

// jshint
gulp.task('jshint', function() {
	return gulp.src(['app/scripts/app.js', 'app/scripts/controllers.js', 'app/scripts/services.js'])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
});

// minimise images
gulp.task('imagemin', function() {
	return del(['dist/images']), gulp.src('app/images/**/*')
		.pipe(cache(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest('dist/app/images'));
});

// minimise
gulp.task('usemin', function() {
	return gulp.src('./app/**/*.html')
		.pipe(usemin({
			css: [minifycss(), rev()],
			js: [ngannotate(), uglify(), rev()]
		}))
		.pipe(gulp.dest('dist/app/'));
});

// copy to dist
gulp.task('copy', function() {
	gulp.src('app/**/*.*')
		.pipe(gulp.dest('dist/app/'));
});

// build
gulp.task('build', ['clean', 'jshint', 'copy', 'imagemin'], function() {

});

// Default task
gulp.task('default', ['clean', 'jshint'], function() {

});

function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}
