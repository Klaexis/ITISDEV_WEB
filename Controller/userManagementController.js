const {db} = require('../firebase');

const userManagementController = {
    userPage: async function (req, res) {
        try {
            // Fetch all users from Firestore
            const usersSnapshot = await db.collection('user').get();
    
            if (usersSnapshot.empty) {
                console.log('No matching documents found in users collection.');
            } else {
                console.log('Documents found:');
                usersSnapshot.forEach(doc => {
                    console.log(doc.id, '=>', doc.data());
                });
            }
    
            // Map the documents to users and calculate age
            const users = usersSnapshot.docs.map(doc => {
                const data = doc.data();
                let age = 'N/A';
    
                // Calculate age from dateOfBirth if available
                if (data.dateOfBirth) {
                    try {
                        const [month, day, year] = data.dateOfBirth.split('/').map(Number);  // Split MM/DD/YYYY and convert to numbers
                        if (month && day && year) {
                            const birthDate = new Date(year, month - 1, day);  // Create a new Date object
    
                            // Calculate age
                            const today = new Date();
                            let calculatedAge = today.getFullYear() - birthDate.getFullYear();
                            const monthDifference = today.getMonth() - birthDate.getMonth();
                            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                                calculatedAge--;
                            }
                            age = calculatedAge;
                        } else {
                            console.error(`Invalid date components for user ${data.fullName}:`, [month, day, year]);
                        }
                    } catch (error) {
                        console.error(`Error parsing dateOfBirth for user ${data.fullName}:`, error);
                    }
                }
    
                return {
                    id: doc.id,
                    fullName: data.fullName || "No Name Provided",
                    age: age,
                    sex: data.sex || "N/A",
                    contactNumber: data.contactNumber || "N/A",
                    email: data.email || "N/A",
                    address: data.address || "N/A",
                    role: data.role || "N/A",
                };
            });
    
            console.log("Fetched users array:", users); // Debugging line
    
            // Render the user management page and pass the users
            res.render('userManagement', { users: users });
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).send('Error fetching users');
        }
    },

    // creation of resident
    createUser: async function (req, res) {
        console.log("Received Data (req.body): ", req.body); // Debugging line
        const { fullName, dateOfBirth, contactNumber, email, sex, role, address } = req.body;
    
        try {
            const userRef = db.collection('user');
            
            // Get the latest announcement to determine the next ID
            const snapshot = await userRef
                .orderBy('userID', 'desc')
                .limit(1)
                .get();
    
            let setID;
            // If no documents exist, start with a1, else increment the last ID
            if (snapshot.empty) {
                setID = 'u1';
            } else {
                const lastDoc = snapshot.docs[0].data();
                const lastID = lastDoc.userID;
                const lastNumber = parseInt(lastID.replace('u', ''), 10);
                setID = 'u' + (lastNumber + 1);
            }

            const newUser = {
                userID: setID,
                role,
                fullName,
                dateOfBirth,
                contactNumber,
                email,
                sex,
                address,
                createdAt: new Date().toISOString()
            }

            await userRef.doc(setID).set(newUser)
        } catch (error) {
            console.error('Error creating Resident:', error);
            res.status(500).send('Error creating Resident: ' + error.message);
        } 

        res.redirect('/userPage')
    },

    // get all users
    getAllUsers: async function (req, res) {
        try {
            const usersSnapshot = await db.collection('user').get();
            const users = usersSnapshot.docs.map(doc => {
                const data = doc.data();
                const dob = data.dateOfBirth;
    
                console.log(`Processing user ${data.fullName}: dateOfBirth is`, dob);
    
                let age = 'N/A';
                if (dob) {
                    try {
                        const [month, day, year] = dob.split('/').map(Number);  // Split MM/DD/YYYY and convert to numbers
                        console.log(`Parsed date components for ${data.fullName}: Month: ${month}, Day: ${day}, Year: ${year}`);
                        
                        if (month && day && year) {
                            const birthDate = new Date(year, month - 1, day);  // Create a new Date object
                            console.log(`Birth date object for ${data.fullName}:`, birthDate);
    
                            if (!isNaN(birthDate)) {
                                // Calculate age
                                const today = new Date();
                                let calculatedAge = today.getFullYear() - birthDate.getFullYear();
                                const monthDifference = today.getMonth() - birthDate.getMonth();
                                if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                                    calculatedAge--;
                                }
                                age = calculatedAge;
                                console.log(`Calculated age for ${data.fullName}:`, age);
                            } else {
                                console.error(`Invalid birthDate object for user ${data.fullName}`);
                            }
                        } else {
                            console.error(`Invalid date components for user ${data.fullName}:`, [month, day, year]);
                        }
                    } catch (error) {
                        console.error(`Error parsing dateOfBirth for user ${data.fullName}:`, error);
                    }
                } else {
                    console.error(`No dateOfBirth provided for user ${data.fullName}`);
                }
    
                return {
                    id: doc.id,
                    fullName: data.fullName || "No Name Provided",
                    age: age,
                    sex: data.sex || "N/A",
                    contactNumber: data.contactNumber || "N/A",
                    email: data.email || "N/A",
                    address: data.address || "N/A",
                    role: data.role || "N/A",
                };
            });
    
            console.log('Fetched Users:', users);
            res.render('userManagement', { users });
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).send('Error fetching users');
        }
    },

    // get by user id
    getUserById: async function (req, res) {
        const { userId } = req.params;
        try {
            const userDoc = await db.collection('user').doc(userId).get();
            if (!userDoc.exists) {
                res.status(404).send('User not found');
            } else {
                res.status(200).json({ id: userDoc.id, ...userDoc.data() });
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).send('Error fetching user: ' + error.message);
        }
    },

    // update by user id
    updateUserById: async function (req, res) {
        const { userId } = req.params;
        const { fullName, dateOfBirth, contactNumber, email, sex, address } = req.body;
        try {
            await db.collection('user').doc(userId).update({
                fullName,
                dateOfBirth,
                contactNumber,
                email,
                sex,
                address
            });
            res.status(200).send('User updated successfully');
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).send('Error updating user: ' + error.message);
        }
    },

    // delete by user id
    deleteUserById: async function (req, res) {
        const { userId } = req.body; // Extract the userId from the request body
        try {
            if (!userId) {
                return res.status(400).send('User ID is required');
            }
            await db.collection('user').doc(userId).delete(); // Delete the document from Firestore
            res.status(200).send('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).send('Error deleting user: ' + error.message);
        }
    }
};

module.exports = userManagementController;




