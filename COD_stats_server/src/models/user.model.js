const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    battle_net: {
        battletag: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        sub: {
            type: String,
            required: true
        },
        access_token: {
            type: String,
            required: true
        }
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