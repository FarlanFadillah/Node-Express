const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRoute = require('../routes/userR');
const errorHandler = require('../controllers/errorHandler')
const process = require('process');
const session = require('../services/session');


const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(session);


app.use('/user', userRoute);
app.get('/', function(req, res){
    var body = '';
    if(!req.session.user) res.redirect('login');
    if (req.session.views) {
        ++req.session.views;
    } else {
        req.session.views = 1;
        body += '<p>First time visiting? view this page in several browsers :)</p>';
    }
    res.send(body + '<p>viewed <strong>' + req.session.views + '</strong> times.</p>');
});

app.get('/login', (req, res) => {
    res.status(200).json({success : false, msg : "Please login"})
})

app.use(errorHandler);

app.listen(process.env.PORT, (err)=>{
    if(err) console.log(err.message);
    console.log(`Server listening at http://localhost:${process.env.PORT}`)
})