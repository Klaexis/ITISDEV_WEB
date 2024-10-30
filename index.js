const express = require("express");
// const mongoose = require('mongoose');
// require('dotenv').config(); //For .env variables

//Routing file
const router  = require('./routes.js');
const bodyParser = require("body-parser"); 

//For Session
// const session = require('express-session');
// const MongoStore = require('connect-mongo');

// //For Cloud Mongo Atlas
// const mongoAtlasUri = "";
// try {
//     // Connect to the MongoDB cluster
//     mongoose.connect(mongoAtlasUri);
//     console.log("Mongoose is connected")

// } catch (e) {
//     console.log("could not connect");
// }

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