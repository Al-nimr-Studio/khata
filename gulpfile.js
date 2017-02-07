/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create();


//browserSync 
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
});

//watch task
gulp.task('watch', ['browserSync'], function (){
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('dist/**/*.js', browserSync.reload); 
});

// gulp sequence
gulp.task('build', function (callback) {
  runSequence(

    [ 
    
    'browserSync',
    'watch'
    ],

    callback
  )
});


// create a default task and just log a message
gulp.task('default',['build']);