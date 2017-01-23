var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
  return gulp.src('static/css/src/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('static/css/dist'))
});

gulp.task('autoprefix-then-minify', function(){
  return gulp.src('static/css/dist/*.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions', '> 0%','Firefox ESR'],
        cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('static/css/dist'))
});

gulp.task('browser-sync', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        online: true
    });
});

gulp.task('default', ['browser-sync'], function() {
	gulp.watch('static/css/src/*.scss', ['sass']);
	gulp.watch('static/css/dist/*.css', ['autoprefix-then-minify']);
    //gulp.watch("**/*.{html,css,js,scss}").on('change', browserSync.reload);
    gulp.watch("**/*.html").on('change', browserSync.reload);
    gulp.watch("static/**/*").on('change', browserSync.reload);
});