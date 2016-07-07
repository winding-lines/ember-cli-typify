var BroccoliTypify = require('broccoli-typify');
var fs = require('fs');

function TypeScriptPreprocessor(options) {
  this.name = 'ember-cli-typify';
  this.ext = 'ts';
  this.options = options;
}

TypeScriptPreprocessor.prototype.toTree = function(tree, inputPath, outputPath) {
  return new BroccoliTypify.Compiler(tree, this.options);
};

TypeScriptPreprocessor.loadTsConfig = function(configPath) {
  var converted = BroccoliTypify.loadProjectTsconfig(configPath);
  if (converted.errors && converted.errors.length>0) {
    throw "Cannot load the config file " + converted.errors.join("\n");
  }
  return converted.options;
};

module.exports = TypeScriptPreprocessor;
