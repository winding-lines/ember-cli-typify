var path = require('path');

module.exports = {
  description: 'Initialize files needed for typescript compilation',

  files: function() {
    return [path.join(this.path, 'files', 'tsconfig.json')];
  },

   mapFile: function() {
    var result = this._super.mapFile.apply(this, arguments);
    if (result.indexOf('/tsconfig.json')) {
      return 'tsconfig.json';
    }
  },

  normalizeEntityName: function() {
    // Entity name is optional right now, creating this hook avoids an error.
  }
}

