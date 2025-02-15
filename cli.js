#!/usr/bin/env node
const {inWhitFileOrDir, linkStatus} = require('./index');

const route = process.argv[2];
const optionOne = process.argv[3];
const optionTwo = process.argv[4];
const options = {
  validate: false,
  stats: false
};

if (!route) {
  console.log('Please enter a file or path');
  return;
};

// validate options
if ((optionOne === '--validate' && optionTwo === '--stats') || (optionOne === '--stats' && optionTwo === '--validate')) {
  options.validate = true;
  options.stats = true;
} else if (optionOne === '--stats' && !optionTwo) {
  options.validate = false;
  options.stats = true;
} else if (optionOne === '--validate' && !optionTwo) {
  options.validate = true;
  options.stats = false;
} else if (!optionOne && !optionTwo) {
  options.validate = false;
  options.stats = false;
} else {
  console.log('Please enter a valid option');
  process.exit();
}

let uniqueLinks = 0;
let totalLinks = 0;
let brokenLinks = 0;

const mdLinks = (route, options) =>{
  return new Promise((resolve, reject) =>{
    inWhitFileOrDir(route)
      .then((result) =>{
        if (!options.validate && !options.stats) {
          resolve(result);
          result.forEach(element => {
            console.log('FILE: ' + element.file);
            console.table([element], ['href', 'text']);
          });
        } else if (options.validate && !options.stats) {
          result.forEach(element =>{
            linkStatus(element.href)
              .then((response) =>{
                element.status = response.status;
                element.result = response.result;
                console.log('FILE: ' + element.file);
                console.table([element], ['href', 'text', 'status', 'result']);
              });
          });
        } else if (options.stats && !options.validate) {
          totalLinks = result.map(result => result.href);
          uniqueLinks = [...new Set(totalLinks)].length;
          console.log('Total Links: ' + totalLinks.length);
          console.log('Unique Links: ' + uniqueLinks);
        } else if (options.validate && options.stats) {
          const brokenArray = result.map((el)=> {
            return linkStatus(el.href);
          });
          Promise.all(brokenArray).then((resolvedPromiseArray)=> {
            resolvedPromiseArray.forEach((el) => {
              if (el.result === 'FAIL') {
                brokenLinks ++;
              }
            });
            totalLinks = result.map(result => result.href);
            uniqueLinks = [...new Set(totalLinks)].length;
            console.log('Total Links: ' + totalLinks.length);
            console.log('Unique Links: ' + uniqueLinks);
            console.log('Broken Links: ' + brokenLinks);
          });
        }
      });
  });
};

mdLinks(route, options);

module.exports = { mdLinks };
  
