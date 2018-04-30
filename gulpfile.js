const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const webpack = require('webpack-stream');
const watch = require('gulp-watch');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

gulp.task('browser-sync', function() {
    browserSync({
        server: './public'
    });
});

gulp.task('default', ['styles', 'scripts', 'browser-sync'], () => {
  gulp.watch('./src/sass/**/*', ['styles']).on('change', reload);
  gulp.watch('./src/**/*', ['scripts']).on('change', reload);
  gulp.watch('./public/*.html')
    .on('change', reload);
});


gulp.task('styles', () => {
  gulp.src('src/sass/**/*.scss')
    .pipe(
      sass({
        outputStyle: 'compressed',
      })
      .on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
    }))
    .pipe(gulp.dest('./public/css'))
    // .pipe(browserSync.stream());
});


//  Regular JavaScripts
gulp.task('scripts', () => {
  gulp.src('src/js/**/*.js')
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});

// Images
gulp.task('images', () =>
  gulp.src('src/img/*')
  .pipe(imagemin({
    progressive: true,
    use: [pngquant()],
  }))
  .pipe(gulp.dest('img'))
);

//  For React
// gulp.task('react', () => {
//   gulp.src('client/')
//     .pipe(webpack(require('./webpack.config.js')))
//     .pipe(gulp.dest('client/public/js'));
// });
