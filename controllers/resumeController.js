const { createToken } = require('../midlewares/jwt');
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE, err => err && console.log(err));


const  about = {
    name: 'John Marit',
    bio: `we go above and beyond to ensure that your argo is handled with the utmost care. We believe that our success is directly tied to the success of our customers, and we work hard to build long-lasting partnerships based on trust, transparency, and mutual respect`,
    gender: 'male',
    profession: 'Software Engineer',
    state: 'Juba',
    address: 'Hai Malaika',
    avatar: 'john.jpg'
}

const contacts = {
    email:'konakech3@gmail.com',
    phone:'+211920079070',
    whatsApp:'+211910185011',
    facebook:'https://facebook.com/koni.akech',
    twitter:'https://facebook.com/koni.akech',
    linkedin:'https://facebook.com/koni.akech',
}
const skills = [
    {
        title: 'Web Developement',
        desicription: `we go above and beyond to ensure that your cargo is handled with the utmost care. We believe that our success is`
    },
    {
        title: 'Graphic Design',
        desicription: `we go above and beyond to ensure that your cargo is handled with the utmost care. We believe that our success is`
    },
    {
        title: 'Networking',
        desicription: `we go above and beyond to ensure that your cargo is handled with the utmost care. We believe that our success is`
    }
]

const education = [
    {
        univeristy: 'Catholic of Juba',
        college: 'CS',
        year: '2018 - 2024'
    },
    {
        univeristy: 'Univerity of Juba',
        college: 'IT',
        year: '2012 - 2028'
    }
]

const experience = [
    {
        employer: 'SSBL',
        position: 'Brewing Tecnician',
        duration: '2012-2016'
    },
    {
        employer: 'VSS',
        position: 'Guard',
        duration: '2018-2024'
    },
]

const projects = [
    {
        id:'f5s5xa5',
        projectname:'James Mayen',
        image:null,
        desicription:'this guy is very good'
    },
    {
        id:'f5s5xa5',
        projectname:'James Mayen',
        image:null,
        desicription:'this guy is very good'
    },
]

const comments = [
    {
        id:'f5s5xa5',
        name:'James Mayen',
        text:'this guy is very good'
    },
    {
        id:'f5s5xa5',
        name:'James Mayen',
        text:'this guy is very good'
    },
]

const sql = `INSERT INTO resumeTable(
    userID, 
    about, 
    contacts, 
    skills, 
    education, 
    experience, 
    projects ,
    comments
    ) VALUES(?,?,?,?,?,?,?,?)
`

// db.run(sql, [
//         2, 
//         JSON.stringify(about), 
//         JSON.stringify(contacts), 
//         JSON.stringify(skills),
//         JSON.stringify(education),
//         JSON.stringify(experience),
//         JSON.stringify(projects),
//         JSON.stringify(comments)
//     ], async (err) => {
//     if (err) {
//         console.log(err)
//     }
// })


// db.run('update resumeTable set userID=3 WHERE id=2')
// GET ALL RESUMIES
const getAllResume = (req, res) => {
    try {
        db.all('SELECT * FROM resumeTable', [], (err, rows) => {
            if (err) throw err;
            const resumies = rows.map(info => {
                const about = JSON.parse(info.about)
                const skills = JSON.parse(info.skills)
                const education = JSON.parse(info.education)
                const experience = JSON.parse(info.experience)
                const projects = JSON.parse(info.projects)
                const comments = JSON.parse(info.comments)
                return {...info, about, skills, education, experience, projects, comments}
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
        db.get(`SELECT * FROM resumeTable WHERE userID='${req.body.id}'`, [], (err, rows) => {
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


module.exports = { getAllResume, getSingleResume }