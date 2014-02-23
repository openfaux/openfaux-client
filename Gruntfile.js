/* jshint node: true */

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // Configuration
  grunt.initConfig({
    // Meta data
    pkg: grunt.file.readJSON('package.json'),

    // Tasks
    jshint: {
      src: {
        options: {
          jshintrc: true,
          ignores: 'node_modules/**'
        },
        src: ['**/*.js']
      }
    },
    jscs: {
      gruntfile: {
        src: ['Gruntfile.js']
      },
      src: {
        src: ['**/*.js']
      }
    },
    clean: {
      dist: 'dist'
    },
    copy: {
      chrome: {
        src: 'chrome/**',
        dest: 'dist/'
      }
    },
    zip: {
      chrome: {
        src: 'chrome/**',
        dest: 'dist/chrome.crx'
      }
    },
    watch: {
      chrome: {
        files: 'chrome/**/*',
        tasks: ['test', 'dist'],
      }
    }
  });

  // Load plugins
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  // Tests task
  grunt.registerTask('test', ['jshint', 'jscs']);

  // Distribution task
  grunt.registerTask('dist', ['clean', 'copy', 'zip']);

  // Default task
  grunt.registerTask('default', ['test', 'dist']);
};
