/**
   * Explores recursively a directory and returns all the filepaths and folderpaths in the callback.
   * Modified to find md files
   *
   * @see http://stackoverflow.com/a/5827895/4241030
   * @param {String} dir
   * @param {Function} done
   */

const searchInDirectory = (route)=>{
  return new Promise((resolve, reject) =>{
    fs.readdir(route, (err, list) =>{
      console.log(list);
      let pending = list.length;
      console.log(pending);
      if (!pending) resolve(arraymdFiles);
      list.forEach((item) =>{
        item = path.resolve(route, item);
        fs.stat(item, function(err, stat) {
          if (stat && stat.isDirectory()) {
            console.log('es directorio');
            searchInDirectory(item);
            console.log('ahora ' + pending);
            if (!--pending) resolve(arraymdFiles);
          } else {
            console.log('es archivo');
            mdFile(item);
            console.log(arraymdFiles);
            if (!--pending) resolve(arraymdFiles);
          // .then((arraymdFiles) => {
          // });  
          }
        });
      });
    });
  });
};


/*
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
}
}; */ 

