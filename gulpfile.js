var gulp        = require('gulp'),
    plugins     = require('gulp-load-plugins')(),
    watch       = plugins.watch,
    stylish     = require('jshint-stylish'),
    path = {
        js   : 'src/js/',
        scss : 'src/scss/',
        dist : {
            css : 'assets/css/',
            js  : 'assets/js/',
        }
    }

gulp.task('scripts', function() {
    gulp.src([
        path.js + 'svg-functions.js',
        path.js + 'main.js',
    ])
        .pipe(plugins.concat('main.js'))
        .pipe(gulp.dest(path.dist.js))
        .pipe(plugins.rename('main.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(path.dist.js))
});

gulp.task('lint', function() {
    return gulp.src(path.js + '**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish));
});

gulp.task('compass', function() {
    gulp.src(path.scss + '*.scss')
        .pipe(plugins.compass({
            css   : path.dist.css,
            sass  : path.scss,
            require: ['susy']
        }))
        .pipe(plugins.autoprefixer())
        .pipe(gulp.dest(path.dist.css))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.cssmin())
        .pipe(gulp.dest(path.dist.css))
});


gulp.task('watch', function() {
    gulp.watch(path.scss + '**/*.scss', ['compass']);
    gulp.watch(path.js + '**/*.js', ['scripts']);
});

gulp.task('default', ['compass'], function() {

});
