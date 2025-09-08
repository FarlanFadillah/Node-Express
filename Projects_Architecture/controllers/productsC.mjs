import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('./db/mydb.sqlite3', (err) => {
  if (err) {
    console.error(err.message);
  }
    console.log('Connected to the mydb.sqlite3 database.');
});

db.serialize(() => {

  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER)`);
});


export function allProducts (req, res){
    db.all('SELECT * FROM products', [], (err, rows) => {
        if(err){
            console.log(err.message)
            return res.status(400).json({success : false, msg : "Failed to load all products"})
        }

        res.status(200).json({success: true, data : rows})
    })
}

export function createProduct (req, res){
    const { name, price } = req.body

    if(!name || !price){
        return res.status(400).json({success : false, msg : "Please provide name and price"})
    }

    db.run('INSERT INTO products (name, price) VALUES (?, ?)', [name, Number(price)], (err, rows)=> {
        if(err){
            throw err
        }
        res.status(201).json({success : true, data : {name, price}, msg : "Success"})
    })
}

export function getProduct (req, res) {
    const {id} = req.params

    if(!id){
        return res.status(400).json({success : false, msg : "Please provide an id"})
    }

    db.get("SELECT * FROM products where id = (?)", [id], (err, row) =>{
        if(err){
            throw err
        }
        if(row === undefined) return res.status(400).json({success : false, msg : "Product not found"})
        res.status(200).json({success : true, data : row})
    })
}

export function deleteProduct (req, res) {
    const {id} = req.params
    if(!id){
        return res.status(400).json({success : false, msg : "Please provide an id"})
    }

    db.run("DELETE FROM products WHERE id = (?)", [id], (err, row)=> {
        if (err) {
            console.log(err.message)
            throw err
        }
        res.status(204)
    })
}

export function updateProduct (req, res){
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
    if(!name && !price){
        return res.status(400).json({status : false, msg: "Please provide name or price to update"})
    }

    values.push(id)
    db.run(`UPDATE products SET ${column.join(', ')} WHERE id = ?`, values, (err, row) =>{
        if (err) throw err
        res.status(201).json({success : true, data : req.body})
    })
}