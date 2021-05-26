'use strict';
const { rejects } = require('assert');
const { stat } = require('fs');
const { mdFile, searchInDirectory, readingFile, scanDir } = require('./catchFiles');

const route = process.argv[2];
const optionOne = process.argv[3];
const optionTwo = process.argv[4];


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

mdLinks(route)
  .then((result) =>{
    result.forEach(element => {
      console.log('FILE: ' + element.file);
      console.table([element], ['href', 'text']);
    });
  });
