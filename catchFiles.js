fs = require('fs');
path = require('path');
marked = require('marked');

// Function to find .md files
arraymdFiles = [];
arrayLinks = [];
const mdFile = (route) => {
  return new Promise((resolve, reject) => {
    let extFile = path.extname(route);
    if (extFile === '.md') {
      arraymdFiles.push(route);
      readingFile(route)
        .then((arrayLinks) =>{
          resolve(arrayLinks);
          // console.log(arrayLinks);
        });
    } else {
      console.log('no es md');
      resolve(arraymdFiles);
    }
  });
};

/**
   * Explores recursively a directory and returns all the filepaths and folderpaths in the callback.
   * Modified to find md files
   *
   * @see http://stackoverflow.com/a/5827895/4241030
   * @param {String} dir
   * @param {Function} done
   */
const fileWalker = (route, done) =>{
  return new Promise((resolve, reject) => {
    let results = [];    
    fs.readdir(route, (err, list) =>{
      if (err) return done(null, result);
      let pending = list.length;
      if (!pending) return done(null, result);
      console.log(list);
      list.forEach((item) => mdFile(item)
        .then((arraymdFiles) =>{
          if (arraymdFiles.length === 0) {
            console.log('no hay archivos md');
            list.forEach(function(file) {
              file = path.resolve(route, file);
              fs.stat(file, function(err, stat) {
                console.log('este es file ' + file);
                if (stat && stat.isDirectory()) {
                  console.log('hay mas directorios');
                  results.push(file);
                  console.log('resultados 1 ' + results);
                  fileWalker(file, function(err, res) {
                    results = results.concat(res);
                    console.log('resultados 2 ' + results);
                    if (!--pending) return done(null, results);
                  });
                } else {
                  results.push(file);
                  console.log('Este es result 3' + results);
                  if (!--pending) return done(null, results);
                }
              });
            });
          }
        })
      );
      resolve(arraymdFiles);
    });
  });
};


const readingFile = (route) =>{
  return new Promise((resolve, reject) =>{
    let myFile = route;
    fs.readFile(myFile, 'utf8', (err, data) => {
      if (err) {
        console.log('error: ', err);
      } else {
        // const arrayLinks = [];
        let render = new marked.Renderer();
        render.link = function(href, title, text) {
          const linkElements = {
            href,
            text,
            file: myFile,
          };
          arrayLinks.push(linkElements);
        };
        marked(data, {
          renderer: render,
        });
        resolve(arrayLinks);
        // console.log(marked(data));
      }
    });
  });
};

module.exports = {
  mdFile,
  fileWalker,
  readingFile
};