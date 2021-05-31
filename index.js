'use strict';
const { stat } = require('fs');
const { mdFile, scanDir} = require('./catchFiles');

const mdLinks = (route, options) =>{
  return new Promise((resolve, reject) =>{
    inWhitFileOrDir(route)
      .then((links) =>{
        resolve(links);
      });
  });
};

// Check if path is file or directory
const inWhitFileOrDir = (route) => {
  return new Promise((resolve, reject) => {
    let isDirectory;
    stat(route, (error, stats) => {
      if (error) {
        reject(console.log('la ruta especificada no es correcta'));
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

module.exports = { mdLinks };