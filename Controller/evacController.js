const { db } = require('../firebase');

const evacController = {
    //Display the Evacuation Center
    generateEvacCenter: async function(req, res){
        try {
            // Get reference to the evacuation collection
            const evacuationRef = db.collection('evacuation');
            
            // Get all announcements
            const snapshot = await evacuationRef.get();
            
            // Convert the Firebase documents to a more manageable array
            const evacuationCenter = [];
            snapshot.forEach(doc => {
                evacuationCenter.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            // Render the page with the evacuationCenter data
            res.render('evac', { evacCenter: evacuationCenter });
            
        } catch (error) {
            console.error('Error fetching evacuation center:', error);
            res.status(500).send('Error fetching evacuation center');
        }
    },

    //Create the Evacuation Center
    createEvacCenter: async function(req, res){
        try {
            // Get reference to the evacuation collection
            const evacuationRef = db.collection('evacuation');
            
            // Get the latest announcement to determine the next ID
            const snapshot = await evacuationRef
                .orderBy('evacID', 'desc')
                .limit(1)
                .get();
    
            let setID;
            // If no documents exist, start with a1, else increment the last ID
            if (snapshot.empty) {
                setID = 'e1';
            } else {
                const lastDoc = snapshot.docs[0].data();
                const lastID = lastDoc.evacID;
                const lastNumber = parseInt(lastID.replace('e', ''), 10);
                setID = 'e' + (lastNumber + 1);
            }

            //Get values from the inputs
            var name = req.body.evacName
            var address = req.body.evacAddress
            var status = "Active"
            
            // Create new announcement document
            const newEvacuation = {
                evacID: setID,
                evacName: name,
                evacAddress: address,
                evacStatus: status,
            };
    
            // Add the document to Firestore
            await evacuationRef.doc(setID).set(newEvacuation);
            
            console.log("Creating Evacuation Center Successful");
            res.redirect('/evac');

        } catch (error) {
            console.log("Creating Evacuation Center Failed");
            console.error(error);
            res.redirect('/evac');
        }
    },

    //Update the Evacuation Center
    updateEvacCenter: ('/:evacID', async function(req, res){
        try{
            const evacID = req.params.evacID;
            var status = req.body.evacStatus;
            
            // Get reference to the evacuation collection
            const evacuationRef = db.collection('evacuation');
            
            // Update the evacuation center document with the new status
            await evacuationRef.doc(evacID).update({
                evacStatus: status
            });

            console.log("Updating Evacuation Center Successful");
            res.redirect('/evac'); // Redirect to the evacuation center page
        } catch (error) {
            console.log("Updating Evacuation Center Failed");
            console.error(error);
            res.redirect('/evac');
        }
    }),
}

module.exports = evacController;