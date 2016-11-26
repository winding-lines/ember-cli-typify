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
    try {
      var plugin = new Typify({includeExtensions: ['.ts','.js']});
      registry.add('js', plugin);
    } catch ( ex ) {
      console.log( "Missing or invalid tsconfig.json, please fix or run `ember generate ember-cli-typify`." );
      console.log( '  ' + ex.toString());
    }
  }

};
