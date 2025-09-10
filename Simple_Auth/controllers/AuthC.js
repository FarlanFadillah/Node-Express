const { getAll } = require('../../Projects_Architecture/models/productsModel.mjs');
const userModel = require('../models/userM')


async function checkUsername(req, res, next) {
    const {username} = req.body;
    // console.log(username, " > checking the username")
    try {
        const data = await userModel.get(username);
        // console.log(data);
        if(data != undefined) next(new Error("Username already taken!"));
        next();
    } catch (error) {
        next(error);
    }
}

async function registerUser(req, res, next) {
    const {username, password} = req.body;
    try {
        await userModel.register(username, password);
        res.status(204).json({success : true, msg : "User Created"})
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
        const result = await userModel.login(username, password);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
    
}


module.exports = {
    registerUser,
    getAllUser,
    login,
    checkUsername
}