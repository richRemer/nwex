var gulp = require("gulp"),
    rename = require("gulp-rename"),
    source = require("vinyl-source-stream"),
    sass = require("gulp-sass"),
    browserify = require("browserify"),
    sourcemaps = require("gulp-sourcemaps"),
    glob = require("glob"),
    es = require("event-stream");

gulp.task("script", function(done) {
    glob("./script/*.js", function(err, files) {
        if (err) done(err);
        else es.merge(files.map(function(entry) {
            return browserify({entries: [entry]})
                .bundle()
                .pipe(source(entry))
                .pipe(rename({extname: ".bundle.js"}))
                .pipe(gulp.dest("./build"));
        })).on("end", done);
    });
});

gulp.task("style", function() {
    gulp.src("./style/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./build/style"));
});

gulp.task("default", ["script", "style"]);
