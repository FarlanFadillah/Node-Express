const http = require('http');
const {readFileSync} = require('fs');

const homePage = readFileSync('./index.html');

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.end(homePage);
        return;
    }
    if(req.url === '/abouts'){
        res.end('Here is our short history\n');
        return;
    }   

    res.end(
        `<h1>Oops!</h1>
        <p>We can't seem to find the page you are looking for</p>
        <a href="/">back home</a>`
    )
});

server.listen(5000)