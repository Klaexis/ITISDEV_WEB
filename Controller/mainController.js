const { db } = require('../firebase');

const mainController = {
    dashboardPage: async function(req, res) {
        try {
            const sosRef = db.collection('sos');
            const snapshot = await sosRef.where('found', '==', false)
                                          .orderBy('dateLastSent', 'desc')
                                          .limit(1)
                                          .get();

            let sos = null; 
            if (!snapshot.empty) {
                const doc = snapshot.docs[0];
                sos = {
                    id: doc.id,
                    ...doc.data()
                };
            }
            console.log('Fetched SOS:', sos);

            const miaRef = db.collection('mia');
            const miaSnapshot = await miaRef.where('found', '==', false)
            .orderBy('dateSubmitted', 'desc')
            .limit(1)
            .get();

            let miaData = null;
            if (!miaSnapshot.empty) {
                const doc = miaSnapshot.docs[0];
                miaData = {
                    id: doc.id,
                    ...doc.data()
                };
            }
            console.log('Fetched Mia Data:', miaData);

            res.render('dashboard', { sos: sos, mia: miaData });
        } catch (error) {
            console.error('Error fetching sos:', error);
            res.status(500).send('Error fetching sos');
        }
    },
};

module.exports = mainController;