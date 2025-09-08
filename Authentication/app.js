const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const port = 3000;

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

app.get('/', (req, res, next)=>{
    res.status(200).json({success : true, msg : "server is works!!"});
});



app.listen(port, (err)=>{
    if(err) console.log(err.message);
    console.log("Server is listening at http://localhost:3000");
});

