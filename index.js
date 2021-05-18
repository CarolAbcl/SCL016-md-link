'use strict';
const catchDir = require("./catchDir");
const route = process.argv[2];
//module.exports = () => {

//};
if ((route != '') && (route != undefined)) {
  console.log('ruta valida');
  catchDir (route);
} else{
console.log('you must enter a valid path')
}

 