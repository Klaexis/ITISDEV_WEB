const express = require('express');
const app = express(); 

const mainController = require('./Controller/mainController');
const sosController = require('./Controller/sosController');
const miaController = require('./Controller/miaController');
const announcementController = require('./Controller/announcementController');

app.get('/', mainController.dashboardPage);
app.get('/sos', sosController.sosPage);
app.get('/mia', miaController.miaPage);
app.get('/announcement', announcementController.announcementPage);

module.exports = app;