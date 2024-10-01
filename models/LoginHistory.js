const mongoose = require('mongoose');

const LoginHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    loginAt: {
        type: Date,
        default: Date.now, // Automatically set the current date and time when a login is recorded
        required: true
    },
    logoutAt: {
        type: Date
    },
    ipAddress: {
        type: String
    },
    userAgent: {
        type: String
    }
}, { timestamps: true }); // Optional: automatically adds createdAt and updatedAt timestamps

const LoginHistory = mongoose.model('LoginHistory', LoginHistorySchema);

module.exports = LoginHistory;




// The ipAddress field in your LoginHistorySchema typically refers to the network IP address from which the user is connecting to your application. This is the IP address assigned to the user's device by their network, such as their home router, public Wi-Fi, or mobile network.



// app.post('/login', (req, res) => {
//     // Get the IP address from the X-Forwarded-For header or fallback to remoteAddress
//     const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//const userAgent = req.headers['user-agent']; // Capture the User-Agent string

//     // Use the IP address in your login history schema
//     const loginHistory = new LoginHistory({
//         userId: req.body.userId, // Assuming you get userId from request body
//         ipAddress: ipAddress
//     });

//     loginHistory.save()
//         .then(() => res.send('Login recorded'))
//         .catch(err => res.status(500).send('Error recording login'));

//     // Handle the login process
// });


// The user agent is a piece of information sent by the client's browser to the server, which typically includes details about the browser type, version, and operating system.