fs = require('fs');
module.exports = (route) => {
  myFile = route;
  fs.readFile(myFile, 'utf8', (err, data) => {
    if (err) {
      console.log('error: ', err);
    } else {
      console.log('muestra archivo');
    }
  });
} 

