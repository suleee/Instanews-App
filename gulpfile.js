// Require Gulp first!


//variables
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync'),
	eslint = require('gulp-eslint'),  
	plumber = require('gulp-plumber'),
  	notify = require('gulp-notify');

//error pop up message
var plumberErrorHandler = {
  	errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
  })
};

//all the script part: uglify is the function that make the main.js file to main.min.js
// [lint] which is call the "gulp.task('lint')"under
//rename= rename and gulp.dest is the folder to save new file
gulp.task('scripts', ['lint'], function() {
   gulp.src('./js/*.js')
   .pipe(plumber(plumberErrorHandler))
   .pipe(uglify())
   .pipe(rename({ extname: '.min.js' }))
   .pipe(gulp.dest('./build/js'))
}); //watch is the watching script. once I change something in main.js 'watch' automatically
//apply what I have changed to main.min,js so I dont have to worry about main.min,js
gulp.task('watch', function() {
   gulp.watch('js/*.js', ['scripts']); //js folder -main.js file [build-js]
});


//help to find the error in terminal 
//in the eslint file I made rules and if I write something that against my rule
//then 'lint' scan and let me know which part get error
gulp.task('lint', function() {
    return gulp.src(['./js/*.js']) // ** == any subDir js so dont use **/*.js
		.pipe(plumber(plumberErrorHandler))
        .pipe(eslint())
        .pipe(eslint.format())      
        .pipe(eslint.failAfterError());
});


//this is the browser pop-up when it init ./
gulp.task('browser-sync', function(){
	browserSync.init({
		server: {
			baseDir: './'
		}
	})
});//watch once I change something it reload the page and show the chages that I have done
gulp.watch(['build/css/*.css', 'build/js/*.js']).on('change', browserSync.reload);
	// gulp.watch(['style.css', 'build/js/*.js']).on('change', browserSync.reload);


//this 'default' need to be always the end of the page, so it shows the 'watch' and 'browserSync' 
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