import * as productsModel from '../models/productsModel.mjs'


export async function allProducts (req, res){
    try {
        const data = await productsModel.getAll();
        res.status(200).json({success : true, total : data.length, data});
    } catch (error) {
        res.status(400).json({status : false, msg : error.message})
    }
}

export async function createProduct (req, res){
    const { name, price } = req.body
    if(!name || !price) return res.status(400).json({success : false, msg : err.message});
    try {
        await productsModel.create(name, price);
        res.status(200).json({success : true, name : name, price : price});
    } catch (error) {
        res.status(400).json({success : false, msg : error.message});
    }
}

export async function getProduct (req, res) {
    const {id} = req.params

    if(!id){
        return res.status(400).json({success : false, msg : "Please provide an id"})
    }

    try {
        const data = await productsModel.get(id);
        res.status(200).json({success : true, data});
    } catch (error) {
        res.status(400).json({success : false, msg : error.message});
    }
}

export async function searchProduct(req, res){
    const {search} = req.query;
    try {
        const data = await productsModel.searchAsync(search);
        res.status(200).json({success : true, total : data.length, data});
    } catch (error) {
        res.status(400).json({success : false, msg : error.message});
    }
}

export async function deleteProduct (req, res) {
    const {id} = req.params
    if(!id){
        return res.status(400).json({success : false, msg : "Please provide an id"})
    }

    try {
        await productsModel.remove(id);
        res.status(200).json({success : true, msg : `Product with id ${id} is removed.`});
    } catch (error) {
        res.status(400).json({success : false, msg : error.message});
    }
}

export async function updateProduct (req, res){
    const {id} = req.params
    const {name, price} = req.body

    let column = []
    let values = []

    if(name){
        column.push("name = ?")
        values.push(name)
    }
    if(price) {
        column.push("price = ?")
        values.push(price)
    }
    if(!name && !price) return res.status(400).json({status : false, msg: "Please provide name or price to update"});
    

    values.push(id);

    try {
        await productsModel.update(column, values);
        res.status(200).json({success : true, id, name, price});
    } catch (error) {
        res.status(400).json({success : false, msg : error.message});
    }
}