/* jshint node: true */

'use strict';
var path      = require('path');
var Typify = require('./lib/typify');

module.exports = {
  name: 'ember-cli-typify',

  included: function(app) {
    this._super.included.apply(this, arguments);
    this.app = app;

    this.setupPreprocessorRegistry('parent', app.registry);
  },

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  setupPreprocessorRegistry: function(type, registry) {
    var load = Typify.loadTsConfig(__dirname);
    var plugin = new Typify({tsOptions:load});
    registry.add('js', plugin);
  }

};
