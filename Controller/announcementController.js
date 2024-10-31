const { db } = require('../firebase');

const announcementController = {
    announcementPage : async function(req,res){
        try {
            // Get reference to the announcements collection
            const announcementsRef = db.collection('announcements');
            
            // Get all announcements
            const snapshot = await announcementsRef.get();
            
            // Convert the Firebase documents to a more manageable array
            const announcements = [];
            snapshot.forEach(doc => {
                announcements.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            // Render the page with the announcements data
            res.render('announcement', { announcement: announcements });
            
        } catch (error) {
            console.error('Error fetching announcements:', error);
            res.status(500).send('Error fetching announcements');
        }
    },

    createAnnouncement: async function(req, res) {
        try {
            const announcementsRef = db.collection('announcements');
            
            // Get the latest announcement to determine the next ID
            const snapshot = await announcementsRef
                .orderBy('announcementID', 'desc')
                .limit(1)
                .get();
    
            let setID;
            // If no documents exist, start with a1, else increment the last ID
            if (snapshot.empty) {
                setID = 'a1';
            } else {
                const lastDoc = snapshot.docs[0].data();
                const lastID = lastDoc.announcementID;
                const lastNumber = parseInt(lastID.replace('a', ''), 10);
                setID = 'a' + (lastNumber + 1);
            }
    
            // Get values that were sent
            const title = req.body.announcementTitle;
            const content = req.body.announcementContent;
            const status = "Active";
    
            // Get Current Date
            const date = new Date();
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const currentDate = `${month}/${day}/${year}`;
    
            // Create new announcement document
            const newAnnouncement = {
                announcementID: setID,
                announcementTitle: title,
                announcementContent: content,
                announcementUploadDate: currentDate,
                announcementAuthor: "Test",
                announcementStatus: status
            };
    
            // Add the document to Firestore
            await announcementsRef.doc(setID).set(newAnnouncement);
            
            console.log("Creating Announcement Successful");
            res.redirect('/announcement');
    
        } catch (error) {
            console.log("Creating Announcement Failed");
            console.error(error);
            res.redirect('/announcement');
        }
    },
}

module.exports = announcementController;