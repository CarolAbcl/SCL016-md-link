const mdLinks = require('../');
const linkStatus = require('../catchFiles.js');

global.fetch = () =>{
  return Promise.resolve({
    json: () => Promise.resolve({}),
  });
};

describe('LinkStatus', () =>{
  it('should rednder without crashing', () =>{
    console.log(linkStatus);
  });

  it('Deberia mostrar status ok', () => {
    
  });
});

