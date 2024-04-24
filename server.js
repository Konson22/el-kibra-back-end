require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');


const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({ origin: ['http://localhost:3000', 'https://el-kibira.onrender.com'], credentials: true }));

app.use(express.static('images'));

app.use('/auth', authRoutes);
app.use('/resume', resumeRoutes);


const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

