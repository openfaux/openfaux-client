module.exports = function(grunt){
  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'jshint': {
      'all': ['**/*.js'],
      'options': {
        'indent':   2,
        'quotmark': 'single',
        'expr':     true,
        'moz':      true
      }
    },
    'jscs': {
      'options': {
        'disallowKeywords': ['with'],
        'disallowLeftStickedOperators': ['?', '+', '-', '/', '*', '=', '==', '===', '!=', '!==', '>', '>=', '<', '<='],
        'disallowMultipleVarDecl': true,
        'disallowRightStickedOperators': ['?', '/', '*', ':', '=', '==', '===', '!=', '!==', '>', '>=', '<', '<='],
        'disallowSpaceAfterPrefixUnaryOperators': ['++', '--', '+', '-', '~', '!'],
        'disallowSpaceBeforePostfixUnaryOperators': ['++', '--'],
        'requireKeywordsOnNewLine': ['else'],
        'requireLeftStickedOperators': [','],
        'requireSpaceAfterBinaryOperators': ['+', '-', '/', '*', '=', '==', '===', '!=', '!=='],
        'requireSpaceAfterKeywords': ['if', 'else', 'for', 'while', 'do', 'switch', 'return', 'try', 'catch'],
        'requireSpaceBeforeBinaryOperators': ['+', '-', '/', '*', '=', '==', '===', '!=', '!=='],
        'requireSpacesInFunctionExpression': {'beforeOpeningCurlyBrace': true},
        'validateLineBreaks': 'LF'
      },
      'all': ['**/*.js']
    },
    'compile': {
      'chrome': {
        'src': 'chrome/**',
        'dest': 'bin/'
      }
    },
    'ship': {
      'bin/chrome.crx': 'chrome/'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-contrib-jscs');

  grunt.task.renameTask('copy', 'compile');
  grunt.task.renameTask('zip', 'ship');
}