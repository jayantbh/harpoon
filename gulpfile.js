/**
 * Created by Jayant Bhawal on 23-03-2016.
 */
var gulp = require('gulp');
var googlecdn = require('gulp-google-cdn');

gulp.task('default', function () {
	return gulp.src('app/index.html')
		.pipe(googlecdn(require('./bower.json')))
		.pipe(gulp.dest('app'));
});
