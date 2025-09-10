const sqlite = require('sqlite3');
const hasher = require('../auth/hashing')

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


async function register(username, password){
    try {
        const {salt, hash} = await hasher.hash(password);
        // console.log(salt, hash);
        return new Promise((resolve, reject)=>{
            db.run(`INSERT INTO users (username, salt, hash) VALUES (?, ?, ?)`, [username, salt, hash], (err)=>{
            if(err)
            {
                reject(err);
            }
            resolve({success : true});
        })
        })
    } catch (error) {
        throw error;
    }
}

async function login(username, password) {
    try {
        const {salt, hash} = await get(username);
        await hasher.auth(password, salt, hash);
        return {success : true, msg : "User Login"}
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
    login,
    get
}