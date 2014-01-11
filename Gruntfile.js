/* jshint node: true */

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // Project configuration
  grunt.initConfig({
    // Metadata
    pkg: grunt.file.readJSON('package.json'),

    // Tasks configuration
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
