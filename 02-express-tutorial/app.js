const express = require('express');
const app = express();
const morgan = require('morgan');
const data = require('./data.js');
const logger = require('./logger.js');
const authorize = require('./authorize.js');
let port = 5000;

// app.use([authorize, logger])
app.use(morgan('tiny'))

// parse form data
app.use(express.urlencoded({extended: false}));

// static assets
app.use(express.static('./methods-public'))

// parse json
app.use(express.json());

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

app.get('/', (req, res) => {
    res.status(200).send('<p>Home Page</p> <a href="/api/products">Products</a>');
})

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}...`);
})