const {db} = require('../firebase');

exports.checkAuth = function(req, res, next){
    if(req.session.userID){ //If there is session go to /
        res.redirect('/');
    }
    else{ //If there is no session
        return next(); //Jump out of the callback
    }
};

exports.isAuth = async function(req, res, next){
    if (!req.session.userID) {
        return res.redirect('/login'); //If there is no session, go back to login page
    } 

    // Fetch the user from Firestore using the userID stored in the session
    const userDoc = await db.collection('user').doc(req.session.userID).get(); // Adjust the collection name as needed

    const user = userDoc.data();

    if (user.role  === "Resident") {
        res.redirect('/login');
    } else if (user.role  === "Government Official") {
        return next(); // Proceed to the next middleware or route
    }
};