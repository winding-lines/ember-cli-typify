// var BroccoliTypify = require('broccoli-typify');
var tsc = require('broccoli-typescript-compiler').typescript;
var fs = require('fs');
var debug = require('debug')('ember-cli-typify');
var ts = require('typescript');
var stew = require('broccoli-stew');
var find = stew.find;
var MergeTrees = require("broccoli-merge-trees");
var Funnel = require("broccoli-funnel");

function TypeScriptPreprocessor(options) {
  debug('creating new instance with options ', options);
  this.name = 'ember-cli-typify';
  this.ext = 'ts';
  this.options = JSON.parse(JSON.stringify(options));
}

function readConfig(configFile) {
    var result = ts.readConfigFile(configFile, ts.sys.readFile);
    if (result.error) {
        var message = ts.flattenDiagnosticMessageText(result.error.messageText, "\n");
        throw new Error(message);
    }
    return result.config;
}

TypeScriptPreprocessor.prototype.toTree = function(inputNode, inputPath, outputPath) {
  debugger;
  var config = readConfig("./tsconfig.json");
  // "include" setting is meant for the IDE integration,
  // broccoli manages its own input files.
  if (config.include) {
    delete config.include;
  }
  config.include = ["**/*"];

  /*
   * Copy type files used by the typescript compiler.
   *
   * TODO: read out of the tsconfig "paths" variable.
   */
  var types = find(process.cwd(), {
    include: [
      "node_modules/@types/**/*",
      "node_modules/at-types-ember/**/*"
    ]
  });

  /*
   * Passthrough all the javascript files existing
   * in the source/test folders.
   */
  var passthrough = new Funnel(inputNode, {
    exclude: ["**/*.ts"],
    annotation: "TypeScript passthrough"
  });

  /*
   * Files to run through the typescript compiler.
   */
  var filter = new MergeTrees( [types, new Funnel(inputNode, {
    include: ["**/*.ts"],
    annotation: "TypeScript input"
  })]);

  /*
   * Put everything together.
   */
  return new MergeTrees([
    passthrough,
    tsc(filter, {tsconfig: config})
  ], {
    overwrite: true,
    annotation: "TypeScript passthrough + ouput"
  });

};


module.exports = TypeScriptPreprocessor;
