var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
  return gulp.src('src/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('dist'))
});

gulp.task('autoprefix-then-minify', function(){
  return gulp.src('dist/*.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions', '> 0%','Firefox ESR'],
        cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', function() {
	gulp.watch('src/*.scss', ['sass']);
	gulp.watch('dist/*.css', ['autoprefix-then-minify']);

});