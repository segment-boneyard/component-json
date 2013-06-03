var fs     = require('fs')
  , path   = require('path')
  , debug  = require('debug')('component-json');


/**
 * Replace JSON files with Javascript files.
 */

module.exports = function (builder) {
  // Before processing any scripts, convert `.json` files to Javascript.
  builder.hook('before scripts', convertJSON);
};


/**
 * Convert JSON files.
 */

function convertJSON (pkg, callback) {
  // Grab our JSON files.
  if (!pkg.config.files) return callback();
  var files = pkg.config.files.filter(filterJSON);

  files.forEach(function (file) {
    debug('compiling: %s', file);
    var json = fs.readFileSync(pkg.path(file), 'utf8');
    pkg.addFile('scripts', file + '.js', 'module.exports = ' + json);
    pkg.removeFile('files', file);
  });

  callback();
}


/**
 * Filter for .json files.
 */

function filterJSON (filename) {
  if (path.extname(filename) === '.json') return true;
}
