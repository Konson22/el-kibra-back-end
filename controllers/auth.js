const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createToken } = require('../midlewares/jwt');
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE, err => err && console.log(err));


// AUTHENTICATE TOKEN
const authToken = async (req, res) => {
    try {
        res.json(req.user)
    } catch (error) {
        res.status(404).send(error)
    }
}


const logOutUser = (req, res) => {
    res.clearCookie("ACCESS_TOKEN");
    res.json({isLogedOut:true})
}


// db.run(`DELETE FROM usersTable`)
// LOGIN USER
const loginUser = (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            res.status(404).json({ email: 'Enter Email', password: 'Enter password' })
        } else {
            db.get(`SELECT * FROM usersTable WHERE email='${email}'`, async (err, user) => {
                if (err) throw err;
                if (!user) return res.status(404).json({ email: 'Wrong Email!' })
                const verified = await bcryptjs.compare(password, user.password)
                if (!verified) {
                    return res.status(409).json({ password: 'Wrong Password!' })
                }
                const userCredentials = { id: user.id, name: user.name, email: user.email, avatar: user.avatar }
                const ACCESS_TOKEN = await createToken(userCredentials);
                res.cookie('ACCESS_TOKEN', ACCESS_TOKEN, {
                    expires: new Date(Date.now() + (3600 * 1000 * 24 * 180 * 1)),
                    httpOnly: true,
                    sameSite: "none",
                    secure: 'false',
                });
                res.json(userCredentials)
            })
        }
    } catch (error) {
        res.send('Server Side Error...!')
    }
}

// RESGISTER NEW USER
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        db.get(`SELECT * FROM usersTable WHERE email='${email}'`, async (err, user) => {
            if (err) throw err;
            if (user) {
                res.status(409).send('Already registered!')
            } else {
                const hashPass = await bcryptjs.hash(password, 4);
                sql = 'INSERT INTO usersTable(name, email, avatar, password) VALUES(?,?,?,?)'
                db.run(sql, [name, email, 'user.png', hashPass], async function (err) {
                    if (err) throw err
                    const prfile = { id: this.lastID, name, email, avatar: 'user.png' }
                    const ACCESS_TOKEN = await createToken(prfile);
                    res.cookie('ACCESS_TOKEN', ACCESS_TOKEN, {
                        expires: new Date(Date.now() + (3600 * 1000 * 24 * 180 * 1)),
                        httpOnly: true,
                        sameSite: "none",
                        secure: 'false',
                    });
                    res.json({ ACCESS_TOKEN, prfile })
                })
            }
        })
    } catch (error) {
        res.send('Error')
    }
}

// GET ALL USERS
const getAllUsersController = (req, res) => {
    try {
        db.all('SELECT * FROM usersTable', [], (err, rows) => {
            if (err) throw err;
            res.json(rows)
        })

    } catch (error) {
        console.log(error)
    }
}



module.exports = { authToken, loginUser, registerUser, getAllUsersController, logOutUser }