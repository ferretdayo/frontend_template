var gulp = require("gulp");
var watch = require('gulp-watch');
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var browserSync = require("browser-sync");
var notify = require("gulp-notify");
var pug = require("gulp-pug");

gulp.task('default', ['sass', 'browser-sync', 'pug', 'watch']);

gulp.task('watch', () => {
    watch(['./sass/**'], () => {
        gulp.start(['sass']);
    });
    watch(['./pug/**'], () => {
        gulp.start(['pug']);
    })
});

gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: "./"   //サーバとなるrootディレクトリ
        }
    });
    //ファイルの監視
	gulp.watch("./css/**/*.css",   ['reload']);
    gulp.watch("./*.html",         ['reload']);
});

gulp.task("sass", () => {
	gulp.src("./sass/**/*scss")
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
		.pipe(sass())
		.pipe(gulp.dest("./css"))
});

gulp.task("pug", () => {
    gulp.src("./pug/**/*.pug")
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(pug())
        .pipe(gulp.dest("./"))
});

//ブラウザリロード処理
gulp.task('reload', function () {
    browserSync.reload();
});
