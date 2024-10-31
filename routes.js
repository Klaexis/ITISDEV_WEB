const express = require('express');
const app = express(); 

const mainController = require('./Controller/mainController');
const sosController = require('./Controller/sosController');
const miaController = require('./Controller/miaController');
const announcementController = require('./Controller/announcementController');
const userController = require('./Controller/userController');

app.get('/', mainController.dashboardPage);
app.get('/sos', sosController.sosPage);
app.get('/mia', miaController.miaPage);

//Announcement
app.get('/announcement', announcementController.announcementPage);
app.post('/announcementCreated', announcementController.createAnnouncement);

app.get('/userPage', userController.userPage);

module.exports = app;