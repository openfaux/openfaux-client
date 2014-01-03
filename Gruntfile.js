/* jshint node: true */

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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
    clean: {
      dist: 'dist'
    }
  });

  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  grunt.registerTask('test', ['jshint', 'jscs']);
  grunt.registerTask('dist', ['clean', 'copy', 'zip']);
  grunt.registerTask('default', ['test', 'dist']);
};
