var browserSync = require('browser-sync');
var gulp = require('gulp');
var run = require('gulp-run');
var del = require('del');

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "_book"
        }
    });
});

gulp.task('build-doc', ['clean'], function () {
    return run('npm run build').exec('', function() {
        run('echo docs:build DONE!').exec().pipe(browserSync.reload({ stream: true }));
    });
});

gulp.task('watch', function () {
    gulp.watch(['**/*.adoc', '**/*.md', '**/*.less','**/*.css','!_book/**'], ['build-doc']);
});

gulp.task('clean', function () {
    return del.sync(['_book']);
});

gulp.task('default', ['build-doc', 'browser-sync', 'watch']);