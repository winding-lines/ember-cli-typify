/* jshint node: true */

'use strict';
var path      = require('path');
var process = require('process');
var Typify = require('./lib/typify');

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
    console.log('first registry setup ' + type);
    this._typifyRegistrySetup = 7;
    var load = Typify.loadTsConfig(process.cwd());
    var plugin = new Typify({tsOptions:load});
    registry.add('js', plugin);
  }

};
