const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getApps } = require('firebase-admin/app');
const { getMessaging } = require('firebase-admin/messaging'); // Import messaging

const serviceAccount = require('./serviceAccountKey.json');

const firebaseApp = initializeApp({
  credential: cert(serviceAccount)
});

// Check if any Firebase apps are initialized
if (getApps().length === 0) {
    console.log("No Firebase apps initialized");
} else {
    console.log("Firebase is initialized");
}

const db = getFirestore();
const messaging = getMessaging(firebaseApp); // Get the messaging service

module.exports = { firebaseApp, db, messaging }; // Export messaging