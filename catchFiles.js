const { resolve } = require('path');
const fileHound = require('fileHound');

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
          console.log('es md');
        });
    } else {
      reject(console.log('no es md'));      
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
      .find();
    resolve(files);

    // res => (res.forEach(file => {      })
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
  scanDir,
  readingFile
};