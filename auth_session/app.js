const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const process = require('process');
const authRouter = require('./routes/authR');
const path = require('path');
const session = require('./services/session');
const flashMessage = require("./middlewares/flashMessage");

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views'));

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public/static')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(session);
app.use(flashMessage);

app.use('/auth', authRouter);
app.get('/', (req, res) => {
    if(!req.session.isAuthenticated) return res.redirect('/auth/login');
    res.redirect('/home');
})
app.get('/home', (req, res) =>{
    if(!req.session.isAuthenticated) return res.redirect('/auth/login');
    res.render('pages/home', {msg : null, user : req.session.user});
})
// app.use('/', authRouter);





app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
})


