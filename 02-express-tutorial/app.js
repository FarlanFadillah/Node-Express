const express = require('express');
const app = express();
const morgan = require('morgan');
const data = require('./data.js');
const logger = require('./logger.js');
const authorize = require('./authorize.js');
const cors = require('cors');
// const mysql = require('mysql'); // this is to use mysql database
const sqlite3 = require('sqlite3').verbose(); 
// verbose() is used to print detailed error messages to the console
// if you don't use verbose(), you will only get a generic error message
// but the connection will still work without verbose()

let port = 5000; // you can use any port you want
// if you are using a port less than 1024, you need to run the server as root
// for example, sudo node app.js
// but in windows you need to run the command prompt as administrator
// and in mac you need to run the terminal as administrator.
// because ports less than 1024 are reserved for system processes

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '290801',
//   database: 'test'
// }) // this is to create a connection to the database

// connection.connect() // this is to connect to the database


// the order is 
// 1. normal middleware
// 2. route
// 3. error handling middleware

// IMPORTANT
// * if you put the error handling middleware before the route, 
// it will not work because the route will never be reached

// * if you put the normal middleware after the route,
// it will not work because the normal middleware will never be reached

// app.all() is used to match all http methods
// app.all('*', (req, res, next) => { // "*" means all routes, so this will run for all routes
//     console.log('This will run for all http methods');
//     next(); // this is used to pass the request to the next middleware
// }) 
// this mean for all routes and all http methods
// but this is not a good practice because it will run for all routes
// and it will slow down the server
// so it is better to use app.use() for normal middleware
// and app.all() for specific routes

// we can also user specific route for app.all()
// app.all('/api', (req, res, next) => {
//     console.log('This will run for all http methods for /api');
//     next(); // this is used to pass the request to the next middleware
// })



const db = new sqlite3.Database('./mydb.sqlite3', (err) => {
  if (err) {
    console.error(err.message);
  }
    console.log('Connected to the mydb.sqlite3 database.');
});

// db.serialize() is used to ensure that the queries are executed in order
// so that the table is created before any data is inserted into it
// db.serialize() is neceessary because sqlite3 is asynchronous and 
// we want to make sure that the queries are executed in order

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
  )`);
});

// app.use([authorize, logger])
app.use(morgan('tiny')) // this is a third party middleware for logging requests
// built-in middleware to handle urlencoded data
// in other words, form data:
// 'content-type: application/x-www-form-urlencoded'

app.use(cors())

// parse form data
app.use(express.urlencoded({extended: true})); // this is for parsing application/x-www-form-urlencoded 
// application/x-www-form-urlencoded is the default encoding type for forms. It is used to send data to the server in key-value pairs. 
// The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) 
// or the qs library (when true). The qs library allows for rich objects and arrays to be encoded into the URL-encoded format, 
// allowing for a JSON-like experience with URL-encoded.
// if extended is false, you can only parse simple key-value pairs. If extended is true, you can parse nested objects and arrays.
// if you are not apply the express.urlencoded() middleware, req.body will be undefined when you try to access it in a POST request with form data.

// static assets
app.use(express.static('./methods-views')) // this is overriding the default url path to the views folder

// parse json
app.use(express.json()); // this is for parsing application/json



app.get('/api/employees', (req, res) => { // this is a route handler
    // connection.query('SELECT * FROM employees', (err, result, fields) => {
    // if (err) throw err
    // res.status(200).json({success: true, data: result});
    // })

    db.all('SELECT * FROM employees', [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.status(200).json({success:true, data: rows})
    });
})

// app.get(/a/, (req, res) => { // this route will match any path that contains the letter 'a'
//     res.send('a');
// })


app.post('/api/employees', (req, res) => { 
    const {first_name, last_name} = req.body;
    console.log(req.body);

    if(!first_name || !last_name){
        return res.status(400).json({success: false, msg: 'Please Provide First Name and Last Name'});
    }

    // connection.query(`INSERT INTO employees (first_name, last_name) VALUES ('${first_name}', '${last_name}');`, (err, result, fields) => {
    //     console.log(result);
    // if (err) throw err
    // return res.status(201).json({success: true, data: result});
    // })

    db.run("INSERT INTO employees (first_name, last_name) VALUES (?, ?)", [first_name, last_name], (err) => {
        if (err) {
            return console.log(err.message)
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`)
        res.status(201).json({success: true, data: {first_name, last_name}}) 
    })
});

app.post('/login', (req, res) => {
    const {name} = req.body;
    console.log(req.body);
    // console.log(name);
    if(name.length === 0){
        //return res.json({success: true, msg : 'Please Provide Credentials'});    
        return res.send('Please Provide Credentials');
    }
    
    const user = data.people.find((person) => person.name.toLowerCase() === name.toLowerCase());
    if(!user){
        return res.send('Invalid User');
    }
    res.status(200).send(`Welcome ${user.name}`);
})


app.get('/api/products', (req, res) => {
    const newProducts = data.products.map((product) =>{
        const {id, name, image} = product;
        return {id, name, image};
    })
    res.json(newProducts);
})

app.get('/api/people', (req, res) => {
    res.json({success: true, data: data.people});
})


app.post('/api/people', (req, res) => {
    const {name} = req.body;
    console.log(req.body);
    if(!name){
        return res.status(400).json({success: false, msg: 'Please Provide Name Value'});
    }
    res.status(201).json({success:true, person: name})
})



app.get('/api/products/:productID', (req, res) => {
    const {productID} = req.params;
    const singleProduct = data.products.find((product) => product.id === Number(productID));
    if(!singleProduct){
        return res.status(404).send('Product Does Not Exist');
    }
    return res.json(singleProduct);
})


app.get('/api/v1/users', (req, res) => {
    
    const {search, limit} = req.query;

    let sortedUsers = [...data.people];

    if(search){
        sortedUsers = sortedUsers.filter((person)=>{
            return person.name.startsWith(search);
        })
    }

    if(sortedUsers.length < 1){
        return res.status(200).json({success: true, data: []});
    }

    if(limit){
        sortedUsers = sortedUsers.slice(0, Number(limit));
    }

    res.send(sortedUsers);
})

// app.get('/', (req, res) => {
//     res.status(200).send('<p>Home Page</p> <a href="/api/products">Products</a>');
// })


app.get('/profile', (req, res, next) => {
    const user = null;
    if(!user)
    {
        return next(new Error('You must be logged in to view this page'));
    }
    else {
        res.send('Welcome to your profile page');
    }
});

// error handling middleware
app.use((err, req, res, next) => {
    //console.error(err.stack);
    console.log(`Something broke : ` + err.message)
    res.status(500).send(`Something broke : ` + err.message);
});



app.get('/download', (req, res) => {
    const path = __dirname + '/data.js';
    res.download(path, 'Data.js', (err) => {
        if(err){
            console.log(err.message)
            res.status(500).json({success : false, msg : 'Failed To Download'})
        }
    })
    
})

// postman testing

app.post('/api/postman/employees', (req, res) =>{
    const {first_name, last_name} = req.body;
    if(!first_name || !last_name){
        return res
        .status(400)
        .json({status : false, msg : 'Please provide first name and last name'})
    }
    console.log(first_name, last_name)
    res.status(201).json({status : true, data : {first_name, last_name}})
})

app.put('/api/postman/employees/:id', (req, res) =>{
    const {id} = req.params;
    const {name} = req.body;
    res.status(200).json({status : true, id : id, name : name})
})


// the different between app.get and app.post is that app.get is used to retrieve data from the server, while app.post is used to send data to the server. app.get is idempotent, meaning that multiple identical requests will have the same effect as a single request. app.post is not idempotent, meaning that multiple identical requests may have different effects, such as creating multiple resources.

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}...`);
})