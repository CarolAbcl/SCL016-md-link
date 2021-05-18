fs = require('fs');
marked = require('marked');
module.exports = (route) => {
  myFile = route;
  fs.readFile(myFile, 'utf8', (err, data) => {
    if (err) {
      console.log('error: ', err);
    } else {
      console.log(data);
      console.log(marked(data))
      /*const expresion = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      let foundLinks = data.match(expresion);
      console.log(foundLinks);*/
    }
  });
} 

const foundLinks = (route, data) => {
  const arrayLinks = [];
  const renderer = new marked.Renderer(); // customizar dependiendo de la sintaxis
  searchRoutemd(route).forEach((data) => {
    renderer.link = (href, title, text) => { // renderer define salida ouput con tres propiedades
      const linkProperties = {
        href,
        text,
        file,
      };
      arrayLinks.push(linkProperties);
    };
    marked(readFilePath(file), { renderer });
    console.log(arrayLinks);
  });
  const arrayLinkFilter = arrayLinks.filter((element) => /^(https?:\/\/)/.test(element.href));
  return arrayLinkFilter;
};

/*const regularExpressions = (data) => {
  console.log(typeof data);
  const anyLink = data;
  const regularExp = /(http:\/\/)?(www\.)[a-zA-Z0-9.-]+\.(com|net|cl)/;
      let position = anyLink.indexOf('http');
      console.log(position);
      if (regularExp.test(anyLink)){
          console.log('es una URL');
          return true;
      }else{
          console.log('NO es una URL');
          return false;
      } 
      
  }
  
  //regularExpressions();
*/