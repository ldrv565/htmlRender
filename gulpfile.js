var gulp = require('gulp'), // Подключаем Gulp
	browserSync = require('browser-sync'); // Подключаем Browser Sync

gulp.task('serve', function () {
	browserSync.init({
		server: {
			baseDir: "./app"
		}
	});
	gulp.watch("./app/js/*.js").on("change", browserSync.reload);
});

gulp.task('default', gulp.series('serve'));