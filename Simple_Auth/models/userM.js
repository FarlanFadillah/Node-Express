const sqlite = require('sqlite3');

const db = new sqlite.Database('./db/mydb.sqlite3', (err)=>{
    if(err) return console.log(err.message);
    console.log('Connected to main.sqlite3...');
});

db.serialize(()=>{
    db.run(`CREATE TABLE IF NOT EXISTS users (
        username TEXT PRIMARY KEY NOT NULL,
        salt TEXT NOT NULL,
        hash TEXT NOT NULL
        )`, (err)=>{
            if(err) console.log(err.message);
        });
});


async function register(username, salt, hash){
    try {
        return new Promise((resolve, reject)=>{
            db.run(`INSERT INTO users (username, salt, hash) VALUES (?, ?, ?)`, [username, salt, hash], (err)=>{
            if(err)
            {
                reject(new Error(`Username ${username} already exists`));
            }
            resolve({success : true});
        })
        })
    } catch (error) {
        throw error;
    }
}

function get(username) {
    return new Promise((resolve, reject)=>{
        db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row)=>{
            if(err) reject(err);
            resolve(row);
        });
    })    
    
}


function getAll(){
    return new Promise((resolve, reject)=>{
        db.all(`SELECT * FROM users`, [], (err, rows)=>{
            if(err) reject(err);
            resolve(rows);
        })
    })
}


module.exports = {
    register,
    getAll,
    get
}