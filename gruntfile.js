/*!
 * IASD LGPD Script
 * https://adventistas.org
 * Copyright 2020
 */

module.exports = function (grunt) {
  "use strict";

  // Force use of Unix newlines
  grunt.util.linefeed = "\n";

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
  };

  // Project configuration.
  grunt.initConfig({
    banner:
      "/*!\n" +
      " * IASD LGPD Script\n" +
      " * https://adventistas.org\n" +
      " * Copyright 2020\n" +
      " * Version: 190922 \n" +
      " */\n",

    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1,
      },
      target: {
        files: {
          "assets/css/styles.min.css": ["assets/css/styles.css"],
        },
      },
    },

    "file-creator": {
      basic: {
        "assets/css/styles.js": function (fs, fd, done) {
          fs.writeSync(
            fd,
            'var style = "' +
              grunt.file.read("assets/css/styles.min.css") +
              '";'
          );
          done();
        },
      },
    },

    concat: {
      options: {
        stripBanners: false,
      },
      iasdLGPD: {
        src: ["assets/css/styles.js", "assets/js/iasd_lgpd.js"],
        dest: "assets/js/iasd_lgpd.concat.js",
      },
    },

    uglify: {
      options: {
        report: "min",
      },
      iasdLGPD: {
        options: {
          banner: "<%= banner %>",
        },
        src: ["<%= concat.iasdLGPD.dest %>"],
        dest: "dist/iasd_lgpd.min.js",
      },
    },

    watch: {
      scripts: {
        files: [
          "assets/js/iasd_lgpd.js",
          "assets/css/styles.js",
          "assets/css/styles.css",
        ],
        tasks: ["cssmin", "file-creator", "concat", "uglify"],
        options: {
          spawn: false,
        },
      },
    },
  });

  // These plugins provide necessary tasks.
  require("load-grunt-tasks")(grunt);
  require("time-grunt")(grunt);

  grunt.registerTask("default", ["cssmin", "file-creator", "concat", "uglify"]);
};
