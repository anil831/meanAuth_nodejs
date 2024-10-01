const mongoose = require('mongoose');



const TokenSchema = new mongoose.Schema({
    refreshToken:{
        type:String,
        required:true,
        unique: true
    },
    expiresAt:{
        type:Date,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    }
}, { timestamps: true });

TokenSchema.index({ refreshToken: 1 }); // Create an index on refreshToken

const Token = mongoose.model('Token',TokenSchema);

module.exports = Token;