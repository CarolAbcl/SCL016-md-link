'use strict';
const fileHound = require('fileHound');
const fetch = require('node-fetch');
const { stat } = require('fs');
const fs = require('fs');
const path = require('path');
const marked = require('marked');

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

// Function to find .md files
let arraymdFiles = [];
let arrayLinks = [];
const mdFile = (route) => {
  return new Promise((resolve, reject) => {
    let extFile = path.extname(route);
    if (extFile === '.md') {
      arraymdFiles.push(route);
      readingFile(route)
        .then((arrayLinks) =>{
          resolve(arrayLinks);
        });
    } else {
      console.log('it is not a md file');      
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

module.exports = { 
  inWhitFileOrDir,
  linkStatus
};