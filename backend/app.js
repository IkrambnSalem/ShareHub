// import express 
const express = require("express");
const app = express();

// import mongoose
const mongoose =require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/Alpino');
// import multer 
const multer =require("multer");
// import de bcrypt 
const bcyrpt = require ("bcrypt");
// import de jsonwebtoken 
const jwt = require("jsonwebtoken");
// import bodyparser
const bodyParser=require("body-parser");
// send JSON reponses
app.use(bodyParser.json())
// get object from request
app.use(bodyParser.urlencoded({ extended: true }));
// .use pour la configuration de l'application 
// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});
// import path module
const path = require("path");

const User=require("./models/user");
const File = require ("./models/files");

// Business Logic of signup
app.post("/allUsers",(req,res)=>{
  console.log("here objt from FE",req.body);
  bcyrpt.hash(req.body.password,8).then((cryptedPassword)=>{
    let user= new User({
      userName :req.body.userName,
      email:req.body.email ,
      password:cryptedPassword,
      role:req.body.role,
  })
  user.save().then((doc)=>{
    if (doc) {
        res.json({message:"the objc is added with success"});   
    } else {
        res.json({message:"Error"}); 
    }
   
})
  })
})


// business Logic of LoGin
app.post("/allUsers/login",(req,res)=>{
  console.log("here business logic of login");
  console.log(req.body);
  let findedUser;
  User.findOne({userName:req.body.userName}).then((doc)=>{
    findedUser=doc;

if (!doc) {
  console.log("this is the doc",doc);
  res.json({message:"Please check your userName"})
  // c important que req.body.pass soit avant le doc.password
}return bcyrpt.compare(req.body.password,doc.password);
  }).then((pdwResult)=>{
   if (!pdwResult) {
    res.json({message:"Please check your Password"})
   }else{
     const token = jwt.sign({
         email:findedUser.email,
         userName:findedUser.userName,
         role:findedUser.role,
     },
     "Testing",
     { expiresIn:"30min"}
     
     );
     let userToSend = {
      id:findedUser._id,
      userName:findedUser.userName,
      role:findedUser.role,
      email:findedUser.email,
      jwt: token,
      expiresIn:900,
     }
     res.json({message:"welcome", user:userToSend})
   }
  });


});
app.use('/files', express.static(path.join('backend/files')));
const MIME_TYPE = {
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'image/vnd.dwg': 'dwg ',
  'application/x-zip-compressed' : "zip",
  'application/vnd.ms-excel' : 'xls',
  'application/acad' : 'dwg',
};


const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(error, 'backend/files/');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE[file.mimetype];
    const fileName = name + '-' + Date.now() + '.' + extension;
    cb(null, fileName);
  }
});
const upload = multer({ storage: storageConfig }).array('files');

// business Logic of upload files 
app.post("/dct", upload, (req, res) => {
  // Récupérer les fichiers uploadés
  const files = req.files;

  // Votre logique de traitement des fichiers ici
  console.log("Fichiers reçus : ", files);

  // Répondre à la demande du client
  res.send("Fichiers reçus avec succès");
});





module.exports = app;
