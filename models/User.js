const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures no two users have the same email
        match: [/.+\@.+\..+/, 'Please fill a valid email address'] // Basic email format validation
    },
    password: {
        type: String,
        required: true
    },
    role: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
}, { 
    timestamps: true,
    toJSON: { 
        versionKey: false 
    },
    toObject: { 
        versionKey: false 
    }
 });

const User = mongoose.model('User',UserSchema);

module.exports = User;

// regex written in between two forward slashes
// .+\@.+\..+/: This is the regular expression pattern used for basic email validation.

// /.+ : It ensures that there is at least one character(except for line break) before the @ symbol.
// \@ : This matches the @ symbol. It is escaped with a backslash (\) because @ has special meaning in regex patterns.
// .+ : This matches one or more of any character after the @ symbol. This ensures that there is at least one character after @.
// \. : This matches a literal dot (.). It is escaped with a backslash because . has special meaning in regex patterns (it matches any character).
// .+ : This matches one or more characters following the dot. This ensures that there is at least one character after the dot.