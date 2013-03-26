# component-json

  A plugin to convert JSON files for the component builder.

## Install

    $ npm install component-json

## Usage

  Add your `.json` files to the `files` array in your `component.json`:
  
  ```json
  {
    "files": [
      "data.json"
    ]
  }
  ```

  Use the plugin during your build process:

  ```js
  var fs      = require('fs')
    , Builder = require('component-builder')
    , json    = require('component-json');

  var builder = new Builder(__dirname);

  builder.use(json);

  builder.build(function(err, res){
    if (err) throw err;
    fs.writeFileSync('build/build.js', res.require + res.js);
    if (res.css) fs.writeFileSync('build/build.css', res.css);
  });
  ```

  And then require the files in your Javascript:

  ```js
  var tip  = require('tip')
    , data = require('./data.json');
  ```