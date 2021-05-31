#!/usr/bin/env node
const {mdLinks} = require('./index');
const {linkStatus} = require('./catchFiles');


const route = process.argv[2];
const optionOne = process.argv[3];
const optionTwo = process.argv[4];
const options = {
  validate: false,
  stats: false
};

if (!route) {
  console.log('por favor ingrese un archivo o una ruta');
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
  console.log('ingrese una opcion valida');
}

console.log(options);


let uniqueLinks = 0;
let totalLinks = 0;

mdLinks(route, options)
  .then((result) =>{
    console.log(result);
    if (options.validate === false && options.stats === false) {
      result.forEach(element => {
        console.log('FILE: ' + element.file);
        console.table([element], ['href', 'text']);
      });
    } else if (options.validate === true && !options.stats) {
      result.forEach(element =>{
        linkStatus(element.href)
          .then((response) =>{
            console.log(response);
            element.status = response.status;
            element.result = response.result;
            console.log('FILE: ' + element.file);
            console.table([element], ['href', 'text', 'status', 'result']);
          });
      });
    } else if (options.stats === true && options.validate === false) {
      totalLinks = result.map(result => result.href);
      uniqueLinks = [...new Set(totalLinks)].length;
      console.log('Total Links: ' + totalLinks.length);
      console.log('Unique Links: ' + uniqueLinks);
    } else if (options.validate === true && options.stats === true) {
      let brokenLinks;
      result.forEach(element =>{
        linkStatus(element.href)
          .then((response) =>{
            console.log(response.result);
          });
      });
    }
  });
