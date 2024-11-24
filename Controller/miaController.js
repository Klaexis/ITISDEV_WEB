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
    }
}

module.exports = miaController;