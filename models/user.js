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
    isVerified: {
        type: Boolean,
        default: false,
        index: true
    },
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
    },
}, {timestamps: true});

UserSchema.index({ createdAt: 1 }, {
    expireAfterSeconds: 3 * 24 * 60 * 60,
    partialFilterExpression: {
        isVerified: false
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);