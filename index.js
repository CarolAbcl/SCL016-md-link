'use strict';
const { rejects } = require('assert');
const { stat } = require('fs');
const { mdFile, scanDir, linkStatus } = require('./catchFiles');

const route = process.argv[2];
const optionOne = process.argv[3];
const optionTwo = process.argv[4];
const options = '';


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

mdLinks(route, options)
  .then((result) =>{
    if (!optionOne) {
      result.forEach(element => {
        console.log('FILE: ' + element.file);
        console.table([element], ['href', 'text']);
      });
    } else if (optionOne === 'validate') {
      result.forEach(element =>{
        linkStatus(element.href)
          .then((response) =>{
            element.status = response.status;
            element.result = response.result;
            console.log('FILE: ' + element.file);
            console.table([element], ['href', 'text', 'status', 'result']);
          });
      });
    }
  });
