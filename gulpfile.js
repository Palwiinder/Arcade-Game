const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify'); 

gulp.task('default', ['copy-html','css', 'images', 'js'], function () {
    gulp.watch('./src/css/**/*.scss', ['css']);
    gulp.watch('./src/js/**/*.js', ['js']);
 
});
  
  gulp.task('copy-html', function (){
    return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'))
  })


gulp.task('css', () => {
  return gulp.src('./src/css/**/*.css')
    .pipe(cleanCSS())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./dist/css'));
});
gulp.task('images', function () {
    gulp.src('./src/images/**/*.png')
          .pipe(imagemin({verbose: true}))
          .pipe(gulp.dest('./dist/images'))
    });

    gulp.task('js', function() {
        return gulp.src('./src/js/**/*.js')
          .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('main.js'))
        .pipe(uglify())
     .pipe(gulp.dest('./dist/js'));
    })

    
