var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var gutil = require('gulp-util');
var cssnano = require('gulp-cssnano');

function errHandle(err){
	gutil.log(gutil.colors.red(err.message));
    this.emit('end');
}

gulp.task('watch', ['sass-compile'], function() {
    gulp.watch('src/assets/sass/**/*.scss', ['sass-compile']);
});

gulp.task('default', ['sass-compile']);

gulp.task('clean', function(){
	return del(['src/assets/css/*']);
})

gulp.task('sass-compile', ['clean'], function(){
	gulp.src('src/assets/sass/main.scss')
		.pipe(plumber(errHandle))
			.pipe(sourcemaps.init())
				.pipe(sass({
					"outputStyle": "expanded"
				}))
				//.pipe(cssnano())
			.pipe(sourcemaps.write('.'))
		.pipe(plumber.stop())
		.pipe(gulp.dest('src/assets/css'));
});
