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

export function searchAsync(search){
  return new Promise((resolve, reject)=>{
    db.all(`SELECT * FROM products WHERE name LIKE ?`, ['%' +search + '%'], (err, rows) =>{
        if(err) reject(err);
        resolve(rows);
    });
  });
}

export function getAll(){
  return new Promise((resolve, reject)=>{
    db.all(`SELECT * FROM products`, [], (err, rows) =>{
        if(err) reject(err);
        resolve(rows);
    });
  });
}

export function create(name, price){
  return new Promise((resolve, reject)=>{
    db.run(`INSERT INTO products (name, price) VALUES (?, ?)`, [name, Number(price)], (err)=>{
      if(err) reject(err);
      resolve(null);
    });
  });
}

export function remove(id){
  return new Promise((resolve, reject)=>{
    db.run(`DELETE FROM products WHERE id = ?`, [id], (err)=>{
      if(err) reject(err);
      resolve(null);
    });
  });
}

export function get(id){
  return new Promise((resolve, reject)=>{
    db.get("SELECT * FROM products where id = (?)", [id], (err, row) =>{
        if(err) reject(err);
        if(row === undefined) reject(new Error("Product not found"));
        resolve(row);
    });
  });
}

export function update(column, values){
  return new Promise((resolve, reject)=>{
    db.run(`UPDATE products SET ${column.join(',')} WHERE id = ?`, values, (err)=>{
    if(err) reject(err);
    resolve(null);
  });
  });
}