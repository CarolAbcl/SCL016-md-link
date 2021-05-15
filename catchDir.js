const readingFile = require("./readingFile");
path = require('path');
module.exports = (route) => {
if (path.isAbsolute(route) === true){
  console.log('ruta absoluta');
  readingFile (route);
} else {
  console.log('ruta relativa');
  readingFile (route);
};
};