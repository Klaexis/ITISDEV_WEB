const express = require("express");

// require('dotenv').config(); //For .env variables

//Routing file
const router  = require('./routes.js');
const bodyParser = require("body-parser"); 

//For Session
// const session = require('express-session');

// Initialize Firebase first
require('./firebase');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//for css, js and images and such
app.use(express.static(__dirname + '/Public'));
app.use(express.static(__dirname));

//Ejs enabled   
app.set('view engine', 'ejs');
app.set('views', 'view'); 

port = 3000; 
app.listen(port, function(){
    console.log("Server is running at port: " + port)
}); 

// //Sessions
// app.use(session({
//     secret: 'ITISDEV',
//     store: MongoStore.create({mongoUrl: mongoAtlasUri}), //For Atlas
//     resave: false,
//     saveUninitialized: true,
//     cookies:  {secure: false, maxAge: 24 * 60 * 60 * 1000}
// }));

app.use("/", router); 