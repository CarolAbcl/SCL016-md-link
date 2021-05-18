fs = require("fs");
path = require('path');
const readingFile = require("./readingFile");

module.exports = (route) => {
if (path.isAbsolute(route) === true){
  console.log('ruta absoluta');
  //readingDir(route);
  readingFile (route);
} else {
  console.log('ruta relativa');
  // Funcion para convertir route relativa a absoluta
  //const convertAbsolute = path.resolve(route);
  //console.log(convertAbsolute);
  //readingDir(route);
  readingFile (route);
};
};

/*const readingDir = (route) => {
  myDir= route;
  fs.readdir (myDir, (error, files) => {
    if (error){
      throw error;
    }
    console.log(files);
  })
}*/