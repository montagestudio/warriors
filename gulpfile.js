var gulp        = require('gulp');
var browserSync = require('browser-sync');
var prefix      = require('gulp-autoprefixer');
var reload      = browserSync.reload;

// Static Server + watching scss/html files
gulp.task('serve', ['css'], function() {

    browserSync.init(["assets/style/*.css", "ui/**/*.js"],{
        server: "./"
    });
});

gulp.task('css', function () {
    return gulp.src(['ui/**/*.css', '/assets/style/*.css'])
        .pipe(prefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('ui'))
        .pipe(reload({stream:true}));
});

gulp.task('default', ['serve'], function(){
    gulp.watch("ui/**/*.css", ['css']);
    gulp.watch("**/*.html").on('change', reload);
});
