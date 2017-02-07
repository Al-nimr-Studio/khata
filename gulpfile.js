/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),   
    del = require('del'),   
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack');


// //webpack
// gulp.task('webpack', function(done) {
//  // run webpack
//     webpack({
//           entry: './client/ng-main/main.ts',
//   output: {
//     path: './dist',
//     filename: 'app.bundle.js'
//   },
//   module: {
//     loaders: [
//       {test: /\.ts$/, loader: 'ts'},
    
//     ]
//   },
//   resolve: {
//     extensions: ['', '.js', '.ts', '.html', '.css']
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './client/index.html'
//     }),
//     new webpack.DefinePlugin({
//       app: {
//         environment: JSON.stringify(process.env.APP_ENVIRONMENT || 'development')
//       }
//     })
//   ]

//     }, function(error) {
//         var pluginError;
 
//         if (error) {
//             pluginError = new gulpUtil.PluginError('webpack', error);
 
//             if (done) {
//                 done(pluginError);
//             } else {
//                 gulpUtil.log('[webpack]', pluginError);
//             }
 
//             return;
//         }
 
//         if (done) {
//             done();
//         }
//     });
// });
// //del the dist first
gulp.task('clean:dist', function() {
  return del.sync(['dist/assets','dist/scripts']);
});

// //copying scripts
gulp.task('copying-scripts', function() {
  return gulp.src('client/static/**/*')
  .pipe(gulp.dest('dist/'))
});

// //copying index
// gulp.task('index', function() {
//   return gulp.src('client/index.html')
//   .pipe(gulp.dest('dist/'))
// });

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
    'clean:dist', 
    [ 
    // 'webpack',
    // 'index',
    'copying-scripts',
    'browserSync',
    'watch'
    ],

    callback
  )
});

// create a default task and just log a message
gulp.task('default',['build']);

