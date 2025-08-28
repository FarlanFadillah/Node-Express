const http = require('http')
const {readFileSync } = require('fs')

const homePage = readFileSync('./src/index.html')

const server = http.createServer((req, res)=>{
    if(req.url === '/'){
        res.end(homePage)
        return;
    } else if(req.url === '/about'){
        // Blocking code
        // for(let i=0; i<1000; i++){
        //     for(let j=0; j<1000; j++){
        //         console.log(`${i} ${j}`);
        //     }
        // }
        res.end('Here is our short history')
        return;
    }

    res.end(`
        <h1>Oops!</h1>
        <p>We can't seem to find the page you are looking for</p>
        <a href="/">back home</a>
    `)
})


server.listen(5000, ()=>{
    console.log("Server Listening on port 5000")
})