const express = require('express');
const app = express();
const morgan = require('morgan');
const data = require('./data.js');
const logger = require('./logger.js');
const authorize = require('./authorize.js');
const mysql = require('mysql');
let port = 5000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '290801',
  database: 'test'
})

connection.connect()





// app.use([authorize, logger])
app.use(morgan('tiny')) // this is a third party middleware for logging requests
// built-in middleware to handle urlencoded data
// in other words, form data:
// 'content-type: application/x-www-form-urlencoded'

// parse form data
app.use(express.urlencoded({extended: true})); // this is for parsing application/x-www-form-urlencoded 
// application/x-www-form-urlencoded is the default encoding type for forms. It is used to send data to the server in key-value pairs. The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). The qs library allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.
// if extended is false, you can only parse simple key-value pairs. If extended is true, you can parse nested objects and arrays.
// if you are not apply the express.urlencoded() middleware, req.body will be undefined when you try to access it in a POST request with form data.

// static assets
app.use(express.static('./methods-public')) // this is overriding the default url path to the public folder

// parse json
app.use(express.json()); // this is for parsing application/json



app.get('/api/employees', (req, res) => { // this is a route handler
    connection.query('SELECT * FROM employees', (err, result, fields) => {
    if (err) throw err
    res.status(200).json({success: true, data: result});
    })
})


app.post('/api/employees', (req, res) => { 
    const {first_name, last_name} = req.body;
    console.log(req.body);

    if(!first_name || !last_name){
        return res.status(400).json({success: false, msg: 'Please Provide First Name and Last Name'});
    }

    connection.query(`INSERT INTO employees (first_name, last_name) VALUES ('${first_name}', '${last_name}');`, (err, result, fields) => {
        console.log(result);
    if (err) throw err
    return res.status(201).json({success: true, data: result});
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

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}...`);
})