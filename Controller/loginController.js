const {db} = require('../firebase');

const loginController = {

    generateLogin: async function(req, res){
        res.render('login');
    },

    userVerification: async function(req, res){
        var getEmail = req.body.govOfficialEmail;

        // Fetch user from Firestore using the email
        const userQuerySnapshot = await db.collection('user').where('email', '==', getEmail).get();

        if (!userQuerySnapshot.empty) { // If User Exists
            const userDoc = userQuerySnapshot.docs[0]; // Get the first matching document
            const user = userDoc.data();

            if (user.role  === "Government Official") { // If the User is a Government Official
                req.session.userID = userDoc.id; // Use the document ID as the userID

                console.log(req.session);
                console.log("Successful Login");

                res.redirect('/'); // Redirect to the home page or desired route after successful login
            } else { // If the User is not a Government Official
                console.log('User Does Not Have Access');
                res.redirect('/login');
            }
        } else { // If User Does Not Exist
            console.log('User Does Not Exist');
            res.redirect('/login');
        }
    },

    logoutUser: async function(req, res){
        if(req.session){ //If session exists
            req.session.destroy(()=>{ //Destroy current session
                res.clearCookie('connect.sid'); //Clear cookie data
                res.redirect('/login'); //Return to login screen
            });
        }
    }

};

module.exports = loginController;