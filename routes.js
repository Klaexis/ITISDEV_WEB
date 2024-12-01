const express = require('express');
const app = express(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {checkAuth, isAuth} = require('./Controller/session.js');
const login = require('./Controller/loginController.js');
const mainController = require('./Controller/mainController');
const sosController = require('./Controller/sosController');
const miaController = require('./Controller/miaController');
const announcementController = require('./Controller/announcementController');
const evacController = require('./Controller/evacController');
const userManagementController = require('./Controller/userManagementController');

app.get('/', isAuth, mainController.dashboardPage);

//Login Page
app.get('/login', checkAuth, login.generateLogin);
app.post('/verify', login.userVerification);

//Logout
app.get('/logout', isAuth, login.logoutUser);

//SOS
app.get('/sos', isAuth, sosController.sosPage);
app.get('/resolvedSOSPage', isAuth, sosController.resolvedSosPage);
app.post('/resolveCase', isAuth, sosController.resolveCase);

//MIA
app.get('/mia', isAuth, miaController.miaPage);
app.post('/resolveCaseMIA', isAuth, miaController.resolveCaseMIA);

//Announcement
app.get('/announcement', isAuth, announcementController.announcementPage);
app.post('/announcementCreated', isAuth, announcementController.createAnnouncement);

//Evacuation Center
app.get('/evac', isAuth, evacController.generateEvacCenter);
app.post('/evacCenterCreated', isAuth, evacController.createEvacCenter);
app.post('/updateEvacCenter/:evacID', isAuth, evacController.updateEvacCenter);

//User Management
app.post('/createUser', isAuth, userManagementController.createUser);
app.get('/getAllUsers', isAuth, userManagementController.getAllUsers);
app.get('/getUser/:userId', isAuth, userManagementController.getUserById);
app.post('/updateUser/:userId', isAuth, userManagementController.updateUserById);
app.post('/deleteUser', isAuth, userManagementController.deleteUserById);

app.get('/userPage', isAuth, userManagementController.userPage);

module.exports = app;