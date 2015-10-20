var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var babel       = require('gulp-babel');

// Static Server + watching scss/html files
gulp.task('serve', function() {

    browserSync.init({
        server: "./build"
    });

    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch("src/js/*。js", ['babel']);
    gulp.watch("src/*.html", ['cphtml']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("build/css"))
        .pipe(browserSync.stream());
});

gulp.task('babel', function() {
	return gulp.src("src/js/*.js")
        .pipe(babel())
        .pipe(gulp.dest("build/js"))
        .pipe(browserSync.stream());
});

gulp.task('cphtml', function() {
  gulp.src('src/*.html')
      .pipe(gulp.dest('build'))
      .pipe(browserSync.stream());
});

gulp.task('default', ['serve', 'sass', 'babel', 'cphtml']);