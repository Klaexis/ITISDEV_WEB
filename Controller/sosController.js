const {db} = require('../firebase');

const sosController = {
    sosPage : async function(req,res){
        try {
            // Get reference to the sos collection
            const sosRef = db.collection('sos');
            
            // Get all sos
            //const snapshot = await sosRef.get();
            const snapshot = await sosRef.where('found', '==', false).get();
            
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
        }
    },

    resolveCase : async function(req,res){
        const { sosID } = req.body;

        try {
            // Get a reference to the specific document
            const sosRef = db.collection('sos').doc(sosID);

            // Update the specific field in the document
            await sosRef.update({
                found: true // Use computed property name to set the field dynamically
            });

            res.redirect('/sos')
        } catch (error) {
            console.error('Error updating field:', error);
            res.status(500).send('Error updating field');
        }
    }
}

module.exports = sosController;