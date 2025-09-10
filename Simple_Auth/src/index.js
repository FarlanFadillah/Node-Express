const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const userRoute = require('../routes/userR');
const errorHandler = require('../controllers/errorHandler')
const port = 5050;

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/user', userRoute);

app.use(errorHandler);
 

app.listen(port, (err)=>{
    if(err) console.log(err.message);
    console.log(`Server listening at http://localhost:${port}`)
})