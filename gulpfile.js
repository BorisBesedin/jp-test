"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var del = require("del");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var minify = require('gulp-minify');

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("compress", function() {
  return gulp.src(['source/js/*.js'])
    .pipe(sourcemap.init())
    .pipe(minify())
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest('build/js'));
});

gulp.task("images", function() {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
      ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.html"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("server", function () {
  server.init({
    server: "build",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css")).on("change", server.reload);
  gulp.watch("source/*.html", gulp.series("html")).on("change", server.reload);
  gulp.watch("source/js/*.js", gulp.series("compress")).on("change", server.reload);
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "html",
  "compress"
));

gulp.task("start", gulp.series("build", "server"));