const catchDir = require('./catchDir.js');

const mdLinks = (route) => {
  return new Promise((resolve, reject) => {
    catchDir(route).then((arraymdFiles) => {
      if (arraymdFiles.lenght !== 0) {
        resolve(console.log('archivos encontrados ' + arraymdFiles));
      } else {
        console.log('no se encontraron archivos md');
      }
      if (error) {
        reject(console.log(error));
      }
    });
  });
};

module.exports = { mdLinks };
