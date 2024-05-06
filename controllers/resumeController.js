const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE, err => err && console.log(err));


// db.run('update freelancersTable set userID=3 WHERE id=2')

const createResume = (req, res) => {
    const {
        userID,
        name,
        profession,
        gender,
        state,
        address,
        phone,
        email,
        bio,
        avatar,
        skills,
        socialmedia,
        reviews
    } = req.body
    
    const sql = `INSERT INTO freelancersTable(
        userID, 
        name, 
        profession, 
        gender, 
        state, 
        address, 
        phone ,
        email,
        bio,
        avatar,
        skills,
        socialmedia,
        reviews
        ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)
    `
    try {
        db.run(sql, 
            [
                userID,
                name,
                profession,
                gender,
                state,
                address,
                phone,
                email,
                bio,
                avatar,
                JSON.stringify(skills),
                JSON.stringify(socialmedia),
                JSON.stringify(reviews)
            ], function(err) {
                if(err) throw err
                res.json({
                    userID:this.lastID,
                    name,
                    profession,
                    gender,
                    state,
                    address,
                    phone,
                    email,
                    bio,
                    avatar,
                    skills:JSON.stringify(skills),
                    socialmedia:JSON.stringify(socialmedia),
                    reviews:JSON.stringify(reviews)
                })
            })
    } catch (error) {
        console.log(error)
    }
}


// GET ALL RESUMIES
const getAllResume = (req, res) => {
    try {
        db.all('SELECT * FROM freelancersTable', [], (err, rows) => {
            if (err) throw err;
            const resumies = rows.map(info => {
                const skills = JSON.parse(info.skills)
                const reviews = JSON.parse(info.reviews)
                const socialmedia = JSON.parse(info.socialmedia)
                return {...info, skills, socialmedia, reviews}
            })
            res.json(resumies)
        })

    } catch (error) {
        console.log(error)
    }
}

// GET SIGNLE RESUME
const getSingleResume = (req, res) => {
    try {
        db.get(`SELECT * FROM freelancersTable WHERE userID='${req.body.id}'`, [], (err, rows) => {
            if (err) throw err;
            if(rows){
                res.json({resume:rows})
            }else{
                res.status(404).json({message:'not fund'})
            }
        })
    } catch (error) {
        res.json({message:'Server side error'})
        console.log(error)
    }
}


module.exports = { getAllResume, getSingleResume, createResume }