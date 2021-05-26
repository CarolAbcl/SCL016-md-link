const fileHound = require('fileHound');
const fetch = require('node-fetch');

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
          // console.log('es md');
        });
    } else {
      console.log('no es un archivo md');      
    }
  });
};

// search md files in directories
const scanDir = (route) =>{
  return new Promise((resolve, reject)=>{
    files = fileHound.create()
      .discard('node_modules')
      .paths(route)
      .ext('.md')
      .find()
      .then(files =>(files.forEach(el => {
        resolve(readingFile(el));
      })));
  });
};


const readingFile = (route) =>{
  return new Promise((resolve, reject) =>{
    let myFile = route;
    myFile = path.resolve(myFile);
    fs.readFile(myFile, 'utf8', (err, data) => {
      if (err) {
        console.log('error: ', err);
      } else {
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

/* const linkStatus = link =>{
  fetch(link)
  .then(res = res.text())
  .then()

} */

module.exports = {
  mdFile,
  scanDir,
  readingFile
};