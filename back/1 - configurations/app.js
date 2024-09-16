const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('./multer');
const { querySanitizer } = require('../1 - configurations/validations');
require('dotenv').config();

const app = express();
app.use(cors()); //CORS
app.use('/staticRoute', express.static('1 - configurations/photos'));

app.use(express.json()); //parse "application/json" body
app.use(multer, photoParser); //parse "multipart/form-data" body

app.use(verifyUser); //block unauthorized user actions

app.use(querySanitizer()); //sanitize data received in req.query

const port = process.env.PORT || 5000;
app.listen(port, () => {console.log(`: : : port ${port}`);});

module.exports = app;



/////////////////////////////////////////////// Functions ///////////////////////////////////////////////////////

async function photoParser(req, res, next){//parses the name of the photo in a variable called "req.PHOTO_PARSED"
    if(req.file){req.PHOTO_PARSED = req.file.filename;}
    else{req.PHOTO_PARSED = req.body.selectedPhotoName;}
    next();
}

function verifyUser(req, res, next) {
    if(req.method=='GET' || req.url.indexOf('signup')!=-1 || req.url.indexOf('login')!=-1)
    { next(); }
    else{
        jwt.verify(req.body.token, process.env.jwt_secret, (err, decoded)=>{
            if (err) { res.status(401).send('Action fail (Not Authorized !!)'); }
            else { next() }  
        })
    } 
}