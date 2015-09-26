var gulp = require("gulp"),
    source = require("vinyl-source-stream"),
    rename = require("gulp-rename"),
    browserify = require("browserify"),
    glob = require("glob"),
    es = require("event-stream");

gulp.task("default", function(done) {
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
