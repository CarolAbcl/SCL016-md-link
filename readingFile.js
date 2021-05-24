fs = require('fs');
marked = require('marked');
module.exports = (route) => {
  let myFile = route;
  fs.readFile(myFile, 'utf8', (err, data) => {
    if (err) {
      console.log('error: ', err);
    } else {
      const arrayLinks = [];
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
      console.log(arrayLinks);
      // console.log(marked(data));
    }
  });
};
