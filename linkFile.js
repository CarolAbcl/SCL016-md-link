var marked = require('marked'),
 
// return a custom renderer for marked.
render_unlink = function () {
 
    var render = new marked.Renderer();
 
    render.link = function (href, title, text) {
 
        // render link text in a way that is appropriate
        // for a medium that is not a computer connected
        // to the Internet
        return text + ' ( link to: ' + href + ' )';
 
    };
 
    return render;
 
},
 
md = 'this is some example markdown with [a link](github.com).';
 
console.log(marked(md));
// <p>this is some example markdown with <a href="github.com">a link</a>.</p>
 
console.log(marked(md, {
        renderer: render_unlink()
    }));
// <p>this is some example markdown with a link ( link to: github.com ).</p>
