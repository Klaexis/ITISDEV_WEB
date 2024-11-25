const express = require('express');
const app = express(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mainController = require('./Controller/mainController');
const sosController = require('./Controller/sosController');
const miaController = require('./Controller/miaController');
const announcementController = require('./Controller/announcementController');
const userController = require('./Controller/userController');
const evacController = require('./Controller/evacController');
const userManagementController = require('./Controller/userManagementController');

app.get('/', mainController.dashboardPage);
app.get('/sos', sosController.sosPage);
app.get('/mia', miaController.miaPage);

//Announcement
app.get('/announcement', announcementController.announcementPage);
app.post('/announcementCreated', announcementController.createAnnouncement);

//Evacuation Center
app.get('/evac', evacController.generateEvacCenter);
app.post('/evacCenterCreated', evacController.createEvacCenter);
app.post('/updateEvacCenter/:evacID', evacController.updateEvacCenter);

//SOS Actions
app.post('/resolveCase', sosController.resolveCase);

//User Management
app.post('/createGovernmentOfficial', userManagementController.createGovernmentOfficial);
app.post('/createBarangayOfficial', userManagementController.createBarangayOfficial);
app.post('/createResident', userManagementController.createResident);
app.get('/getAllUsers', userManagementController.getAllUsers);
app.get('/getUser/:userId', userManagementController.getUserById);
app.post('/updateUser/:userId', userManagementController.updateUserById);
app.post('/deleteUser', userManagementController.deleteUserById);


app.get('/userPage', userManagementController.userPage);

module.exports = app;