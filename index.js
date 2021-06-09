'use strict';
const { stat } = require('fs');
const { mdFile, scanDir} = require('./catchFiles');

// const mdLinks = (route, options) =>{
//   return new Promise((resolve, reject) =>{
//     inWhitFileOrDir(route)
//       .then((links) =>{
//         resolve(links);
//       })
//       .catch((err) => console.log('please check'));
//   });
// };

// Check if path is file or directory
const inWhitFileOrDir = (route) => {
  return new Promise((resolve, reject) => {
    let isDirectory;
    stat(route, (error, stats) => {
      if (error) {
        reject(console.log('The path is not correct'));
      } else {
        isDirectory = stats.isDirectory();
        if (isDirectory === false) {
          resolve(mdFile(route));
        } else {
          scanDir(route)
            .then((res) =>{
              resolve(res);
            });
        }
      }
    });
  });
};

module.exports = { 
  inWhitFileOrDir
};