const { messaging, db } = require('../firebase'); 

const miaController = {
    miaPage: async function(req, res) {
        try {
            // Get reference to the mia collection
            const miaRef = db.collection('mia');
            
            // Get all mia documents
            const snapshot = await miaRef.get();
            
            // Convert the Firebase documents to a more manageable array
            const mia = [];
            snapshot.forEach(doc => {
                mia.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            // Render the page with the mia data
            res.render('mia', { mia: mia });
            
        } catch (error) {
            console.error('Error fetching mia:', error);
            res.status(500).send('Error fetching mia');
            //res.redirect('/')
        }
    }, 

    resolveCaseMIA : async function(req,res){
        const { sosID } = req.body; // Assuming you're sending the id, field name, and new value in the request body

        try {
            // Get a reference to the specific document
            const sosRef = db.collection('sos').doc(sosID);

            // Update the specific field in the document
            await sosRef.update({
                found: true // Use computed property name to set the field dynamically
            });

            // Send a success response
            res.redirect('/sos')
        } catch (error) {
            console.error('Error updating field:', error);
            res.status(500).send('Error updating field');
        }
    }
}

module.exports = miaController;