const authM = require('../models/authM');
const hasher = require('../services/hashing');


function renderRegisterForm(req, res) {
    if(req.session.isAuthenticated) return res.redirect('/home');
    res.render('pages/register', {msg : null});
}

function renderLoginForm(req, res){
    if(req.session.isAuthenticated) return res.redirect('/home')
    res.render('pages/login', {msg : null});
}

async function checkUser(req, res, next) {
    const {username} = req.body;
    try {
        const data = await authM.getUser(username);
        console.log(data);
        if(data === undefined) return next();
        res.status(200).render('pages/register', {msg : "username already exists"});
    } catch (error) {
        next(error);
    }
}

async function register(req, res) {
    const {username, first_name, last_name, email, password} = req.body;
    try {
        const {salt, hash} = await hasher.hash(password);
        await authM.addUser(username, first_name, last_name, email, salt, hash);
        //flash message
        res.session.flash = "Register successfully";
        res.status(200).redirect('/auth/login');
    }catch(err){
        res.status(200).render('pages/register', {msg : err.message});
    }

}
async function login(req, res) {
    const {username, password} = req.body;
    try {
        const user = await authM.getUser(username);
        if(user === undefined) throw new Error(`User not found!`);
        await hasher.auth(password, user.salt, user.hash);
        req.session.user = {
            username : user.username,
            isAdmin : user.isAdmin,
        }
        req.session.isAuthenticated = true;
        res.status(200).redirect('/home');
    } catch (error) {
        res.render('pages/login', {msg : error.message});
    }

}


async function logout(req, res) {
    if(req.session.isAuthenticated){
        req.session.destroy();
        return res.render('pages/login', {msg : null});
    }
    res.redirect(req.originalUrl);
}


module.exports = {
    register, login, logout, renderRegisterForm, renderLoginForm, checkUser
}
