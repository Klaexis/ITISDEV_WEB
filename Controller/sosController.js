const { messaging, db } = require('../firebase');

const sosController = {
    sosPage : async function(req,res){
        try {
            // Get reference to the sos collection
            const sosRef = db.collection('sos');
            
            // Get all sos
            const snapshot = await sosRef.get();
            
            // Convert the Firebase documents to a more manageable array
            const sos = [];
            snapshot.forEach(doc => {
                sos.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            // Render the page with the sos data
            res.render('sos', {sos: sos});
            
        } catch (error) {
            console.error('Error fetching sos:', error);
            res.status(500).send('Error fetching sos');
            //res.redirect('/')
        }
    }
}

module.exports = sosController;