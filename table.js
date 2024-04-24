
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE, err => err && console.log(err));


// const sql = `CREATE TABLE usersTable(
//     id INTEGER PRIMARY KEY, 
//     name TEXT NOT NULL,
//     email TEXT NOT NULL,
//     avatar TEXT,
//     password TEXT NOT NULL
// )`;


const sql = `CREATE TABLE resumeTable(
    id INTEGER PRIMARY KEY, 
    userID INTEGER,
    about TEXT,
    contacts TEXT,
    skills TEXT,
    education TEXT,
    experience TEXT,
    projects TEXT,
    comments TEXT
)`;


db.run(sql)
