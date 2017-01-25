// Require Gulp first!

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync'),
	eslint = require('gulp-eslint'),  
	plumber = require('gulp-plumber'),
  	notify = require('gulp-notify');

var plumberErrorHandler = {
  	errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
  })
};


gulp.task('scripts', ['lint'], function() {
   gulp.src('./js/*.js')
   .pipe(plumber(plumberErrorHandler))
   .pipe(uglify())
   .pipe(rename({ extname: '.min.js' }))
   .pipe(gulp.dest('./build/js'))
});
gulp.task('watch', function() {
   gulp.watch('js/*.js', ['scripts']); //js folder -main.js file [build-js]
});


gulp.task('lint', function() {
    return gulp.src(['./js/*.js']) // ** == any subDir js so dont use **/*.js
		.pipe(plumber(plumberErrorHandler))
        .pipe(eslint())
        .pipe(eslint.format())      
        .pipe(eslint.failAfterError());
});



gulp.task('browser-sync', function(){
	browserSync.init({
		server: {
			baseDir: './'
		}
	})
});
gulp.watch(['build/css/*.css', 'build/js/*.js']).on('change', browserSync.reload);
	// gulp.watch(['style.css', 'build/js/*.js']).on('change', browserSync.reload);



gulp.task('default', ['watch', 'browser-sync']);





// gulp.task('say-hello', function(){
// 	console.log('hello');
// });

// //array [ ]
// gulp.task('default', ['scripts', 'say-hello']);

// This is a very basic Gulp task,
// with a name and some code to run
// when this task is called:

//01.
// gulp.task('default', function() {
//    gulp.src('./js/*.js')
//    .pipe(uglify())
//    .pipe(rename({ extname: '.min.js' }))
//    .pipe(gulp.dest('./build/js'))
// });

//change the 'default' to scripts and run in terminal "gulp scripts"