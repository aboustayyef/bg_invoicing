var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');

gulp.task('scripts', function(){
	return browserify({ debug: true })
    .transform(babelify)
    .require("./src/js/app.js", { entry: true })
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(buffer())
	.pipe(uglify())
	.pipe(gulp.dest('./build/js'));
});