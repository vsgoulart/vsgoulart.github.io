#!/usr/bin/env node
"use strict";

const gulp = require("gulp");
const path = require("path");

const folders = {
  dist: path.join(__dirname, "dist"),
  root: path.join(__dirname, "/")
};

gulp.task("copy-index-to-root", function() {
  gulp
    .src([path.join(folders.dist, "index.html")])
    .pipe(gulp.dest(folders.root));
});
