const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    googleID: {
        type: String,
        required: false,
        default: null
    },
    githubID: {
        type: String,
        required: false,
        default: null
    },
    facebookID: {
        type: String,
        required: false,
        default: null
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    emailToken: String,
    isVerified: Boolean,
    username: {
        type: String,
        required: true,
        unique: true,
    },
    nama: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false,
    },
    avatar: {
        type: String,
        required: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);