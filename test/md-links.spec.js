const { mdLinks, inWhitFileOrDir } = require('../index.js');
const { mdFile, linkStatus } = require('../catchFiles.js');

jest.mock('node-fetch'); 
const fetch = require('node-fetch'); 

describe('mdFile', () => {
  it('should return an array for the file', () =>{
    return mdFile('README-Test.md').then(response => {
      expect(response).not.toBeNull();
    });
  });
});

describe('mdLinks', () => {
  it('should be a function', () =>{
    expect(typeof mdLinks).toBe('function');
  });
  it('should be return an array', () =>{
    return mdLinks('README-Test.md').then(resolve => {
      expect(typeof resolve).toBe('object');
    });
  });
});

describe('inWhitFileOrDir ', () => {
  it('should return an error', () => {
    return expect(inWhitFileOrDir('README.js')).rejects.toBe(console.log('The path is not correct'));
  });
});


describe('linkStatus', () => {
  it('should be a function', () => {
    expect(typeof linkStatus).toBe('function');
  });

  it('should return ok and status code for a correct link', () => {
    fetch.mockReturnValue(Promise.resolve({ status: 200,
      statusText: 'OK' })); 
    linkStatus('https://jestjs.io/docs/bypassing-module-mocks').then(res => {
      expect(res.status).toBe(200);
      expect(res.result).toBe('OK');
    });
  });
  it('should return error message in field ok when fetch fails', () => {
    fetch.mockImplementation(() => { 
      return Promise.resolve('FAIL');
    });
    linkStatus('https://mienlacemalo/wiki/Markdown').catch(res => {
      expect(res.result).toBe('FAIL');
    });
  });
});