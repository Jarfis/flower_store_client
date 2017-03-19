// gulp
var gulp = require("gulp");

// plugins
var connect = require("gulp-connect");
var jshint = require("gulp-jshint");
var uglify = require("gulp-uglify");
var minifyCSS = require("gulp-minify-css");
var clean = require("gulp-clean");
var runSequence = require("run-sequence");
var sass = require("gulp-sass");
var rename = require("gulp-rename");

// tasks
gulp.task("sass", function () {
  gulp.src("./assets/sass/*.scss")
  .pipe(sass()).pipe(gulp.dest("./assets/css"));
});

gulp.task("lint", function() {
  gulp.src(["./controllers/*.js", "./directives/*.js", "./services/*.js", "./main.js"])
  .pipe(jshint())
  .pipe(jshint.reporter("default"))
  .pipe(jshint.reporter("fail"));
});

gulp.task("clean", function() {
  gulp.src("./dist/*")
  .pipe(clean({force: true}));
});

gulp.task("minify", function() {
  var opts = {comments:true,spare:true};

  gulp.src(["./assets/css/*.css"])
  .pipe(minifyCSS(opts))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest("./dist/"))

  gulp.src(["./controllers/*.js", "./services/*.js", "./directives/*.js", "./main.js"])
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest("./dist/"))
});

gulp.task("copy-bower-components", function () {
  gulp.src("./bower_components/**")
  .pipe(gulp.dest("dist/bower_components"));
});

gulp.task("copy-html-files", function () {
  gulp.src("./views/**/*.html")
  .pipe(gulp.dest("dist/"));
});

gulp.task("connect", function () {
  connect.server({
    root: "./",
    port: 8888
  });
});

gulp.task("connectDist", function () {
  connect.server({
    root: "dist/",
    port: 9999
  });
});

// default task
gulp.task("default",
  ["lint", "connect"]
);
gulp.task("build", function() {
  runSequence(
    ["clean"],
    ["lint", "sass", "minify", "copy-html-files", "copy-bower-components", "connectDist"]
  );
});