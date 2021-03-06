const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task('sass', function(){
  return gulp.src('static/css/src/*.scss')
    .pipe(sass())
    .on('error', swallowError )    
    .pipe(gulp.dest('static/css/dist'))
});

gulp.task('autoprefix-then-minify', function(){
  return gulp.src('static/css/dist/*.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions', '> 0%','Firefox ESR'],
        cascade: false
    }))
    .on('error', swallowError )    
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .on('error', swallowError )    
    .pipe(gulp.dest('static/css/dist'))
});

gulp.task('browser-sync', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        online: true,
        notify: false
    });
});

gulp.task('default', ['browser-sync'], function() {
	gulp.watch('static/css/src/*.scss', ['sass']);
	gulp.watch('static/css/dist/*.css', ['autoprefix-then-minify']);
    //gulp.watch("**/*.{html,css,js,scss}").on('change', browserSync.reload);
    gulp.watch("**/*.html").on('change', browserSync.reload);
    gulp.watch("static/**/*").on('change', browserSync.reload);
});

function swallowError (error) {
  console.log(error.toString())
  this.emit('end')
}
