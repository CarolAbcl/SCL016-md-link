const fileHound = require('fileHound');
const fetch = require('node-fetch');
const { resolve } = require('path');

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

// read md files and return array with links
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
      }
    });
  });
};

// check links ant return status
const linkStatus = link => {
  return new Promise((resolve, reject) => {
    let arrayLinksStatus = {};
    fetch(link)
      .then((response) => {
        if (response.ok) {
          arrayLinksStatus.status = response.status;
          arrayLinksStatus.result = response.statusText;
          resolve(arrayLinksStatus);
        }
      })
      .catch((err) => {
        arrayLinksStatus.status = 'ERROR';
        arrayLinksStatus.result = 'FAIL';
        resolve(arrayLinksStatus);
      });
  });
};

// let brokenLinks = 0;
// const brokenFunction = links =>{
//   return new Promise((resolve, reject) => {
//     links.forEach(element =>{
//       linkStatus(element.href)
//         .then((response) =>{
//           if (response.result === 'FAIL') {
//             brokenLinks ++;
//             let broken = brokenLinks.toString();
//             resolve(broken);
//           }
//         });
//     });
//   });
// };

module.exports = {
  mdFile,
  scanDir,
  readingFile,
  linkStatus,
};