/* jshint node: true */

'use strict';
var path      = require('path');
var TypeScriptPreprocessor = require('./lib/typify');

module.exports = {
  name: 'ember-cli-typify',

  included: function(app) {
    this._super.included.apply(this, arguments);
    this.app = app;

  },

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  setupPreprocessorRegistry: function(type, registry) {
    var options = TypeScriptPreprocessor.loadTsConfig(path.join(__dirname, 'tsconfig.json'));
    var plugin = new TypeScriptPreprocessor({tsOptions:options});
    registry.add('ts', plugin);
  }

};
