fs = require("fs");
path = require('path');
const { stat } = require("fs");
const readingFile = require("./readingFile");

module.exports = (route) => {
/**
 * Explores recursively a directory and returns all the filepaths and folderpaths in the callback.
 * 
 * @see http://stackoverflow.com/a/5827895/4241030
 * @param {String} dir 
 * @param {Function} done 
 */
 function filewalker(dir, done) {
  let results = [];

  fs.readdir(dir, function(err, list) {
      if (err) return done(err);
 
      var pending = list.length;

      if (!pending) return done(null, results);
      console.log(list);
      list.forEach (item => mdFile(item));
      /*list.forEach(function(file){
          file = path.resolve(dir, file);

          /*fs.stat(file, function(err, stat){
              // If directory, execute a recursive call
              if (stat && stat.isDirectory()) {
                  // Add directory to array [comment if you need to remove the directories from the array]
                  results.push(file);

                  filewalker(file, function(err, res){
                      results = results.concat(res);
                      if (!--pending) done(null, results);
                  });
              } else {
                  results.push(file);

                  if (!--pending) done(null, results);
              }
          });
      });*/
  });
};

//Check if path is file or directory
const inWhitFileOrDir = (route) => {
  return new Promise ((resolve, reject)=> {
    stat(route, (error, stats) => {
      if (error) {
        reject(error)
      } else {
        resolve (isDir = stats.isDirectory())
        console.log(isDir);
      }
    })
  })
}

inWhitFileOrDir(route).then((resolve) => {
if (isDir === false){
  console.log('es un archivo')
  mdFile(route);
  } else{
  console.log('es un directorio')
  filewalker(route, function(err, data){
    if(err){
        throw err;
    } else {
      console.log(data);
    }
});
}
});

//Function to find .md files
const mdFile = (route) =>{
  let extFile = path.extname (route);
  if (extFile === '.md'){
    console.log('encontró archivo md')
    readingFile(route);
  } else {
    console.log('archivo no encontrado')
  }
}

//Check what kind of route we have
if (path.isAbsolute(route) === true){
  console.log('ruta absoluta');
  //readingFile (route);
} else {
  console.log('ruta relativa');
  // Funcion para convertir route relativa a absoluta
  //const convertAbsolute = path.resolve(route);
  //console.log(convertAbsolute);
  //readingDir(route);

  //readingFile (route);
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