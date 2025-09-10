import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('../db/mydb.sqlite3', (err) =>{
    if(err) throw err;
    console.log('Connected to the mydb.sqlite3 database.');
})

db.serialize(()=>{
    db.run(`CREATE TABLE IF NOT EXISTS peoples (
        id INT PRIMARY KEY NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT,
        birth_date DATETIME NOT NULL,
        address TEXT NOT NULL,
        full_address_id INT,
        
        )`)
})