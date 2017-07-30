var gulp = require('gulp');
var plumber = require('gulp-plumber');
var scss = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var gutil = require('gulp-util');
var cssnano = require('gulp-cssnano');

function errHandle(err){
	gutil.log(gutil.colors.red(err.message));
    this.emit('end');
}

gulp.task('watch', ['scss-compile'], function() {
    gulp.watch('src/assets/scss/**/*.scss', ['scss-compile']);
});

gulp.task('default', ['scss-compile']);

gulp.task('clean', function(){
	return del(['src/assets/css/*']);
})

gulp.task('scss-compile', ['clean'], function(){
	gulp.src('src/assets/scss/main.scss')
		.pipe(plumber(errHandle))
			.pipe(sourcemaps.init())
				.pipe(scss({
					"outputStyle": "expanded"
				}))
				//RELEASE: Un-comment
				//.pipe(cssnano())
			.pipe(sourcemaps.write('.'))
		.pipe(plumber.stop())
		.pipe(gulp.dest('src/assets/css'));
});
