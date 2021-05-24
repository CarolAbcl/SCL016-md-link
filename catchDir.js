fs = require('fs');
path = require('path');
const { stat } = require('fs');
const readingFile = require('./readingFile');

module.exports = (route) => {
  /**
   * Explores recursively a directory and returns all the filepaths and folderpaths in the callback.
   * Modified to find md files
   *
   * @see http://stackoverflow.com/a/5827895/4241030
   * @param {String} dir
   * @param {Function} done
   */
  function filewalker(dir, done) {
    let results = [];

    fs.readdir(dir, function(err, list) {
      if (err) return done(err);
      let pending = list.length;
      if (!pending) return done(null, results);
      console.log(list);
      list.forEach((item) => mdFile(item));
      if (arraymdFiles.length === 0) {
        console.log('no tenemos archivos md');
        list.forEach(function(file) {
          file = path.resolve(dir, file);
          fs.stat(file, function(err, stat) {
            console.log('este es file ' + file);
            if (stat && stat.isDirectory()) {
              console.log('hay mas directorios');
              results.push(file);
              console.log('resultados 1 ' + results);
              filewalker(file, function(err, res) {
                results = results.concat(res);
                console.log('resultados 2 ' + results);
                if (!--pending) done(null, results);
              });
            } else {
              results.push(file);
              console.log('Este es result 3' + results);
              if (!--pending) done(null, results);
            }
          });
        });
      } else {
        console.log('tenemos archivos md');
        return done(null, results);
      }
    });
  }

  // Check if path is file or directory
  const inWhitFileOrDir = (route) => {
    return new Promise((resolve, reject) => {
      stat(route, (error, stats) => {
        if (error) {
          reject(error);
        } else {
          resolve((isDir = stats.isDirectory()));
          console.log(isDir);
        }
      });
    });
  };

  // resolving in different way if is file or directory
  inWhitFileOrDir(route).then((resolve) => {
    if (isDir === false) {
      console.log('es un archivo');
      mdFile(route);
    } else {
      console.log('es un directorio');
      filewalker(route, function(err, data) {
        if (err) {
          throw err;
        } else {
          // console.log(data);
        }
      });
    }
  });
  arraymdFiles = [];
  // Function to find .md files
  const mdFile = (route) => {
    let extFile = path.extname(route);
    if (extFile === '.md') {
      arraymdFiles.push(route);
      // readingFile(route);
    } else {
      console.log('no es md');
    }
    console.log(arraymdFiles);
    return arraymdFiles;
  };

  // Check what kind of route we have
  if (path.isAbsolute(route) === true) {
    console.log('ruta absoluta');
    // readingFile (route);
  } else {
    console.log('ruta relativa');
    // Funcion para convertir route relativa a absoluta
    // const convertAbsolute = path.resolve(route);
    // console.log(convertAbsolute);
    // readingDir(route);

    // readingFile (route);
  }

  /* const showLinks = (arraymdFiles) =>{
  arraymdFiles.forEach(item => readingFile(item));
}*/
};
