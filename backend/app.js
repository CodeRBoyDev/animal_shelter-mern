const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
const fileUpload = require('express-fileupload')
const path = require('path')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(fileUpload());

const disease = require('./routes/disease');
const injury = require('./routes/injury');
const animal = require('./routes/animal');
const user = require('./routes/user');
const home = require('./routes/home');
const dashboard = require('./routes/dashboard');

app.use('/api/', disease)
app.use('/api/', injury)
app.use('/api/', animal)
app.use('/api/', user)
app.use('/api/', home)
app.use('/api/', dashboard)

if (process.env.NODE_ENV !== 'PRODUCTION') 
    require('dotenv').config({ path: 'backend/config/config.env' })


    if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}


module.exports = app