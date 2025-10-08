const session = require("express-session");
const process = require('process');
const connectSqlite3 = require('connect-sqlite3')(session);

const SQLiteStore = new connectSqlite3({
    db : 'sessions',
    dir : './db',
    table : 'sessions',
});

// configure session
const my_session = session({
    store: SQLiteStore,
    
});

module.exports = my_session;