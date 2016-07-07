var Typify = require('broccoli-typify');
var fs = require('fs');

function TypeScriptPreprocessor(options) {
  this.name = 'ember-cli-typify';
  this.ext = 'ts';
  this.options = options;
}

TypeScriptPreprocessor.prototype.toTree = function(tree, inputPath, outputPath) {
  return new Typify.Compiler(tree, this.options);
};

TypeScriptPreprocessor.loadTsConfig = function(configPath) {
  var content = fs.readFileSync(configPath);
  var parsed = JSON.parse(content)['compilerOptions'];
  var converted = Typify.toTypescriptOptions(parsed);
  if (converted.errors && converted.errors.length>0) {
    throw "Cannot load the config file " + converted.errors.join("\n");
  }
  return converted.options;
};

module.exports = TypeScriptPreprocessor;
