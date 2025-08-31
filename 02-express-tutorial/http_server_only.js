const http = require('http');
const {readFileSync} = require('fs');   


// Get all files
const homePage = readFileSync('./navbar-app/index.html');
const homeStyles = readFileSync('./navbar-app/styles.css');
const homeImage = readFileSync('./navbar-app/logo.svg');
const homeLogic = readFileSync('./navbar-app/browser-app.js');

const server = http.createServer();

server.on('request', (req, res)=>{

    const url = req.url;
    console.log(url);
    // Home Page
    if(url === '/'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(homePage);
        res.end(() => {
            console.log('Home Page Served');
        });

    // Styles
    } else if(url === '/styles.css'){
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(homeStyles);  
        res.end();

    // Logo
    } else if(url === '/logo.svg'){
        res.writeHead(200, {'Content-Type': 'image/svg+xml'});
        res.write(homeImage);  
        res.end();
        
    // Logic
    } else if(url === '/browser-app.js'){   
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(homeLogic);  
        res.end();

    // About Page
    } else if(url === '/about'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>About Page</h1>');
        res.end(() => {
            console.log('About Page Served');
        });

    // 404 Page
    } else{
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end(`
        <h1>Oops!</h1>
        <p>We can't seem to find the page you are looking for</p>
        <a href="/">back home</a>
        `)
    }
})

let port = 3000;

server.listen(port, ()=>{
    console.log(`Server Listening on port ${port}`)
})