const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        trim: true
    },
    contactNumber: {
        type: String,
        trim: true
    },
    State: {
        type: String,
        trim: false
    },
    password: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    player2name: {
        type: String
    },
    player3name: {
        type: String
    },
    player4name: {
        type: String
    },
    player5name: {
        type: String
    },
    player1id: {
        type: String
    },
    player2id: {
        type: String
    },
    player3id: {
        type: String
    },
    player4id: {
        type: String
    },
    player5id: {
        type: String
    },
});

UserSchema.pre('save', function () {
    if (this.isModified('password')) {
        this.password = bryptjs.hashSync(this.password, 10);
    }
});

UserSchema.methods.comparePasswords = function(password) {
    // return bcryptjs.compareSync(password, this.password);
    return(this.password === password);
};

module.exports = mongoose.model('User', UserSchema);