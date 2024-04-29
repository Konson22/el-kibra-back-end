
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE, err => err && console.log(err));


// const sql = `CREATE TABLE usersTable(
//     id INTEGER PRIMARY KEY, 
//     name TEXT NOT NULL,
//     email TEXT NOT NULL,
//     avatar TEXT,
//     password TEXT NOT NULL
// )`;


const sql = `CREATE TABLE freelancersTable(
    id INTEGER PRIMARY KEY, 
    userID INTEGER,
    name TEXT NOT NULL,
    profession TEXT NOT NULL,
    gender TEXT NOT NULL,
    state TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    bio TEXT NOT NULL,
    avatar TEXT NOT NULL,
    skills TEXT,
    socialmedia TEXT,
    reviews TEXT
)`;


db.run(sql)
