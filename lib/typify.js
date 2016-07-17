var BroccoliTypify = require('broccoli-typify');
var fs = require('fs');
var debug = require('debug')('ember-cli-typify');

var instanceCount = 0;

function TypeScriptPreprocessor(options) {
  debug('creating new instance with options ', options);
  this.name = 'ember-cli-typify';
  this.ext = 'ts';
  this.options = JSON.parse(JSON.stringify(options));
  this.options.instanceName = instanceCount++;
}

TypeScriptPreprocessor.prototype.toTree = function(tree, inputPath, outputPath) {
  return new BroccoliTypify.Compiler(tree, this.options);
};

TypeScriptPreprocessor.loadTsConfig = function(configPath) {
  var converted = BroccoliTypify.loadProjectTsconfig(configPath);
  if (converted.errors && converted.errors.length>0) {
    var show = converted.errors
    .map(function(a) {
      var clean = a.messageText ? a.messageText : a.toString();
      return "    " + clean;
    }).join("\n");
    throw show;
  }
  return converted.options;
};

module.exports = TypeScriptPreprocessor;
