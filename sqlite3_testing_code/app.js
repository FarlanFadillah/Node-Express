const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./test.sqlite3'); // creates a new database in memory

db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER)", 
    (err) => {
        if (err) {
            console.error(err.message);
        } 
        console.log("Table created" );
    }
); // this function creates a new table called users with three columns: id, name, and age. 
// If the table already exists, it will not be created again.

// db.run("INSERT INTO users (name, age) VALUES (?, ?)", ["Alice", 30], function(err) {
//     if (err) {
//         return console.error(err.message);
//     }
// })

// const stm = db.prepare("INSERT INTO users (name, age) VALUES (?, ?)");
// const users = [
//     ["Bob", 25],
//     ["Charlie", 35],
//     ["David", 28],
//     ["Eve", 22]
// ];

// users.forEach((user) => {
//     stm.run(user, (err) => {
//         if (err) {
//             return console.error(err.message);
//         }
//         console.log(`A row has been inserted with rowid ${this.lastID}`);
//     })
// })
// stm.finalize((err) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log("All rows have been inserted");
// })

// db.get("SELECT * FROM users WHERE id = ?", [1], (err, row) => {
//     if(err) {
//         console.error(err.message);
//     }
//     !row <= 0 ? console.log(row) : console.log("No data found (db.get id)");
// }); // the return object only contains one row, because we used db.get

// db.get("SELECT * FROM users WHERE id = ? AND age = ?", [1, 25], (err, row) => {
//     if(err) {
//         console.error(err.message);
//     }
    
//     !row ? console.log(row) : console.log("No data found (db.get id, and age)");
// }) // the id and age are positional parameters

db.all("SELECT * FROM users", [], (err, row) =>{ 
    if(err) {
        console.error(err.message);
    }
    console.log(row)
})// the amount of id depends on how many ? we put in the query

// 1. Create a new table called "lorem" with a single column "info" of type TEXT
// 2. Insert 10 rows into the "lorem" table with the values "Ipsum 0" to "Ipsum 9"
// 3. Query all rows from the "lorem" table and print them to the console
// 4. Close the database connection
// db.serialize(() => {
//     db.run("CREATE TABLE lorem (info TEXT)"); 

//     const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//     for (let i = 0; i < 10; i++) {
//         stmt.run("Ipsum " + i);
//     }
//     stmt.finalize();

//     db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
//         console.log(row.id + ": " + row.info);
//     });
// });

db.close();