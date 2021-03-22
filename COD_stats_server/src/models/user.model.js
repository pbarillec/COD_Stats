const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    sso: {
        type: Object,
        value: {
            type: String
        },
        expiry: {
            type: String
        },
        remember_me: {
            type: String
        }
    },
    aktn: {
        type: String
    },
    pgacct: {
        type: String
    },
    cw_username: {
        type: String
    },
    wz_username: {
        type: String
    }
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
    }
});

module.exports = mongoose.model('User', userSchema);