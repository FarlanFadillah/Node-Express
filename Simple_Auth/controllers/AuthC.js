const { getAll } = require('../../Projects_Architecture/models/productsModel.mjs');
const userModel = require('../models/userM')
const hasher = require("../auth/hashing");


async function checkUsername(req, res, next) {
    const {username} = req.body;
    // console.log(username, " > checking the username")
    try {
        const data = await userModel.get(username);
        if(data === undefined) next();
        next(new Error("Username already taken!"));
    } catch (error) {
        next(error);
    }
}

async function registerUser(req, res, next) {
    const {username, password} = req.body;
    try {
        const {salt, hash} = await hasher.hash(password);
        await userModel.register(username, salt, hash);
        res.status(200).json({success : true, msg : "User Created"})
    } catch (error) {
        next(error);
    }
}


async function getAllUser(req, res, next){
    try {
        const data = await userModel.getAll();
        res.status(200).json({success : true, src : __filename, data});
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    const {username, password} = req.body;
    try {
        const user = await userModel.get(username);
        if(user === undefined) throw new Error(`User not found!`);
        const result = await hasher.auth(password, user.salt, user.hash);
        res.status(200).json(result);
    } catch (error) {
        throw error;
    }
    
}


module.exports = {
    registerUser,
    getAllUser,
    login,
    checkUsername
}