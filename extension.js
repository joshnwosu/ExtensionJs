// ExtensionJs
// Recursively get files by the extension. eg'.mp3'


var path = require('path'), fs = require('fs');
var os = require('os'), homedir = os.homedir();

function getMp3Files(startPath, filter, callbcck) {

  // check if directory path exists
  // if not log 'no dir'
  if (!fs.existsSync(startPath)) {
    console.log('no dir', startPath);
    return;
  }

  var files = fs.readdirSync(startPath);

  for (var i = 0; i < files.length; i++) {

    var filename = path.join(startPath,files[i])
    var stat = fs.lstatSync(filename);

    if (files[i].startsWith('.') == true) {
      files.splice(i, 1)
    }

    else {

      if (stat.isDirectory()) {
        getMp3Files(filename, filter, callbcck); // recursive
      }

      else if (filename.indexOf(filter) >= 0) callbcck(filename)

    }

  }

}

module.exports = getMp3Files
